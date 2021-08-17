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
import {ConfirmDialogComponent} from '../../ui/confirm-dialog/confirm-dialog.component';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {UiService} from '../../ui/ui.service';

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

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataProviderService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private authService: AuthService,
              public dialog: MatDialog,
              private uiService: UiService) { }

  async ngOnInit(): Promise<void> {
    this.uiService.showSpinner()
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
      '100lieux:accessrules':[this.editedOrga.accessrules],
      'pair:phone': [this.editedOrga.phone, Validators.required],
      'pair:email': [this.editedOrga.email, Validators.required],
      'pair:documentedBy': [this.editedOrga?.documentedBy],
      'pair:hasBranch': this.fb.array(([] as FormControl[]).concat(...this.sectors.map(s =>(s.extendedBy.map(b => this.fb.control(this.hasBranchValueInOrga(b.id))))))),
      'pair:hasDomain': this.fb.array(([] as FormControl[]).concat(...this.domains.map(d => this.fb.control(this.hasDomainValueInOrga(d.id))))),
      '100lieux:socialLink': this.fb.array(([]as FormControl[]).concat(...this.editedOrga.socialLink.map( p => this.fb.control([p])))),
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
        }),
    })
    if(this.editedOrga.id) {
      this.populateForm(this.form, this.editedOrga);
    }
    this.uiService.stopSpinner()

  }
  populateForm(form: FormGroup, obj:Organization) {
    this.domainsSelected.push(...obj.hasDomain.map(d => d.id))
    this.branchesSelected.push(...obj.hasBranch.map(d => d.id))
  }
  addSocialNetwork(url?: string) {
      this.socialLink.push(this.fb.control([url]))
  }

  get comments(){
    return this.form.controls['pair:comment']
  }
  get socialLink(): FormArray{
    return (this.form.controls['100lieux:socialLink'] as FormArray);
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
      this.uiService.showSpinner()
      if(this.fileName){
       let response: { [p: string]: string } = await this.postPicture();
       values['pair:documentedBy'] = response;
     }
     if(this.editedOrga.id) {
       await this.dataService.update<Organization>('organizations', values, this.dataService.extractUrlHash(this.editedOrga.id), 'Organization')
     }else{
       await this.dataService.add<Organization>('organizations', values, 'Organization');
     }
      this.uiService.stopSpinner()
      await this.router.navigateByUrl('/map');
    }else{
      this.uiService.stopSpinner()
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
    const file:any =  this.fileInput.nativeElement.files[0];
    formData.append("file", file);
    console.log(file);


    return this.dataService.postFile('files', formData)
  }

  async submitForm() {
    if(this.form.valid) {
      const task = (this.editedOrga?.id) ? 'd\'éditer' : 'd\'ajouter'
      if(!this.authService.currentUserValue){
        const dialogRef= this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: `Vous êtes sur le point ${task} un lieu. Celui ci devra être validé par un administrateur avant de pouvoir être ajouter dans notre base la carte. Cliquez sur valider pou confirmer`,
            type: 'primary'
          }
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log('result', result)
          if(result === 'validate'){
            dialogRef.close();
            this.submit();
            this.dataService.createReq('_mailer/contact-user', {
              name: 'No Reply',
              email:"noreply@100lieuxnourriciers.fr",
              title: "100 lieux nourriciers: Un lieu attend une action de votre part",
              content: "Un lieu attend une action de votre part: https://100lieuxnourriciers.fr/admin/pending",
            }, 'mailer')
          }
        });
      }else{
        this.submit()
      }
    }
  }

  removeSocialFormItem(i: number) {
    this.socialLink.removeAt(i);

  }
}


