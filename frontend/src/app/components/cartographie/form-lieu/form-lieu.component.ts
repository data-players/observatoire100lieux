import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataProviderService} from '../../../services/data-provider.service';
import {Organization} from '../../../model/organization.model';
import {Sector} from '../../../model/sector.model';
import {Domain} from '../../../model/domain.model';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from 'xng-breadcrumb';

@Component({
  selector: 'app-form-lieu',
  templateUrl: './form-lieu.component.html',
  styleUrls: ['./form-lieu.component.scss']
})
export class FormLieuComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild("formElem") formElem!: ElementRef;
  fileName: string=''
  formDataFile = new FormData();
  form!: FormGroup;
  sectors: Sector[] = []
  domains: Domain[] = []
  editedOrga: Organization = new Organization();

  invalidAddress = false;
  submitted = false;

  branchesSelected: string[] = [];
  domainsSelected: string[] = [];

  displayFirstSocialMedia = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataProviderService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService) { }

  async ngOnInit(): Promise<void> {

    this.bcService.set('/map/edit/:id', 'loading')
    const param = this.activatedRoute.snapshot.paramMap.get('id')

    if(param) {
      this.editedOrga = await this.dataService.findOne('organizations', param)
      if(this.editedOrga.id) this.bcService.set('/map/edit/:id', `Edition: ${this.editedOrga.label}`)
    }
    this.sectors =await this.dataService.findAll<Sector>('sectors');
    this.domains = await this.dataService.findAll<Domain>('domains');
    this.form = this.fb.group({
      'pair:id': [this.editedOrga.id],
      'pair:label': [this.editedOrga.label, Validators.required],
      'pair:description': [this.editedOrga.description, Validators.required],
      'pair:homepage': [this.editedOrga.homepage],
      '100lieux:timetable': [this.editedOrga.timetable],
      '100lieux:accessRules':[this.editedOrga.accessRules],
      'pair:phone': [this.editedOrga.phone, Validators.required],
      'pair:email': [this.editedOrga.email, Validators.required],
      'pair:documentedBy':this.fb.control([this.editedOrga?.documentedBy?.id], Validators.required),
      'pair:hasBranch': this.fb.array(([] as FormControl[]).concat(...this.sectors.map(s =>(s.extendedBy.map(b => this.fb.control(this.hasBranchValueInOrga(b.id))))))),
      'pair:hasDomain': this.fb.array(([] as FormControl[]).concat(...this.domains.map(d => this.fb.control(this.hasDomainValueInOrga(d.id))))),
      'pair:hasLocation':
      this.fb.group({
        '@type':['pair:Place'],
        'pair:hasPostalAddress': this.fb.group({
            '@type':['pair:PostalAddress'],
            'pair:label': [this.editedOrga.hasLocation.hasPostalAddress.label],
            'pair:addressCountry': ['France'],
            'pair:addressZipcode': [this.editedOrga.hasLocation.hasPostalAddress.addressZipcode, Validators.required],
            'pair:addressStreet': [this.editedOrga.hasLocation.hasPostalAddress.addressStreet, Validators.required],
            'pair:locality': [this.editedOrga.hasLocation.hasPostalAddress.locality, Validators.required],
            'pair:latitude': [this.editedOrga.hasLocation.hasPostalAddress.latitude],
            'pair:longitude': [this.editedOrga.hasLocation.hasPostalAddress.longitude],
          }),
        'pair:hasDigitalPlace': this.fb.array([
          this.fb.group(
            {
              '@type':['pair:DigitalPlace'],
              'pair:label': [''],
              'pair:page': ['']
            })
          ])
        }),
    })
    if(this.editedOrga.id) {
      this.populateForm(this.form, this.editedOrga);
    }
  }
  populateForm(form: FormGroup, obj:Organization) {
    this.domainsSelected.push(...obj.hasDomain.map(d => d.id))
    this.branchesSelected.push(...obj.hasBranch.map(d => d.id))
    if(obj.hasLocation.hasDigitalPlace.length >= 1 && obj.hasLocation.hasDigitalPlace[0].page)
      this.displayFirstSocialMedia = true;
    this.digitalPlaces?.clear()
    obj.hasLocation.hasDigitalPlace.forEach(o => this.pushToSocialNetworkArray(o.label, o.page));
  }
  addSocialNetwork(name?: string, url?: string) {
    if (!this.displayFirstSocialMedia) {
      this.displayFirstSocialMedia = true
    } else {
      this.pushToSocialNetworkArray(name, url)
    }
  }

  pushToSocialNetworkArray(name?: string, url?: string) {
      this.digitalPlaces!.push( this.fb.group(
        {
          '@type':['pair:DigitalPlace'],
          'pair:label': [name],
          'pair:page': [url]
        }));
    }
  get comments(){
    return this.form.controls['pair:comment']
  }
  get digitalPlaces(): FormArray{
    return (this.form.controls['pair:hasLocation'] as FormGroup).controls['pair:hasDigitalPlace'] as FormArray
  }

 async submit(){
    this.submitted = true;
    const provider = new OpenStreetMapProvider();
    const values = this.form.value;
    const response = await provider.search({query: this.getLongLat(values['pair:hasLocation']['pair:hasPostalAddress'])})
    if(!response || response.length === 0) {
      this.getPostalAdress().setErrors({'unknowaddress' : true});
      this.getPostalAdress().get('pair:addressZipcode')?.setErrors({'unknowaddress' : true});
      this.getPostalAdress().get('pair:addressStreet')?.setErrors({'unknowaddress' : true});
      this.getPostalAdress().get('pair:locality')?.setErrors({'unknowaddress' : true});
      this.invalidAddress = true;
    }else{
      if(response[0].bounds !== null) {
        values['pair:hasLocation']['pair:hasPostalAddress']['pair:latitude'] = response[0].bounds[0][0];
        values['pair:hasLocation']['pair:hasPostalAddress']['pair:longitude'] = response[0].bounds[0][1];
        this.getPostalAdress().setErrors(null)
        this.getPostalAdress().get('pair:addressZipcode')?.setErrors(null)
        this.getPostalAdress().get('pair:addressStreet')?.setErrors(null)
        this.getPostalAdress().get('pair:locality')?.setErrors(null)
        this.invalidAddress = false;
      }
     }

    values['pair:hasBranch'] = this.branchesSelected;
    values['pair:hasDomain'] = this.domainsSelected;

    if(this.branchesSelected.length === 0) this.form.get('pair:hasBranch')?.setErrors({required: true});
    if(this.domainsSelected.length === 0) this.form.get('pair:hasDomain')?.setErrors({required: true});

    if(this.form.valid){
     /*if(this.fileName){
        const response: {[key: string]: string} = await this.postPicture();
        console.log(this.form.get('pair:documentedBy'))
       console.log('BEFORE HERE', response.url);

       (this.form.get('pair:documentedBy') as FormControl).setValue(response.url);
        console.log('AFTER HERE')
     }*/
     if(this.editedOrga.id) {
       await this.dataService.update<Organization>('organizations', values, this.dataService.extractUrlHash(this.editedOrga.id), 'Organization')
     }else{
       await this.dataService.add<Organization>('organizations', values, 'Organization');
     }
      await this.router.navigateByUrl('/map');
    }else{
      this.formElem.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
  }


  private getLongLat(addresse: {[key: string]: string}): string{
    return `${addresse['pair:addressStreet']}, ${addresse['pair:addressZipcode']} ${addresse['pair:locality']}, France`;
  }
  getPostalAdress(): FormGroup{
    return (this.form.get(['pair:hasLocation','pair:hasPostalAddress']) as FormGroup) ;
  }

  setFormValue(value: MatCheckboxChange, id: string, what: string) {
    if(value.checked) {
      this[what === 'branch' ?'branchesSelected' : 'domainsSelected'].push(id);
    }else {
      let findElement =  this[what === 'branch' ?'branchesSelected'  : 'domainsSelected'].find(a => a === id) ?
        this[what === 'branch' ?'branchesSelected'  : 'domainsSelected'].find(a => a === id) : '';
      if (findElement)
        this[what === 'branch' ?'branchesSelected'  : 'domainsSelected'].splice(
          this[what ==='branch' ?'branchesSelected'  : 'domainsSelected'].indexOf(findElement[0]), 1);
    }
  }



  hasBranchValueInOrga(id: string) {
    return !!(this.editedOrga.hasBranch.find(br => {
      return br.id === id
    }));
  }
  hasDomainValueInOrga(id: string) {
    return !!(this.editedOrga.hasDomain.find(br => {
      return br.id === id
    }));
  }

  async onFileSelected(event: Event) {
    const inputEvent = (event.target as HTMLInputElement & EventTarget)
    if(inputEvent && inputEvent.files){
    const file:File =inputEvent.files[0];
      if (file) {
        this.fileName = this.fileInput.nativeElement.value;
      }
    }
  }
  private async postPicture(): Promise<{[key: string]: string}> {
    const formData = new FormData();
    formData.append("file", this.fileInput.nativeElement.files[0]);
    console.log(this.fileInput.nativeElement.files[0])

    return await this.dataService.postFile('files', formData)
  }
}


