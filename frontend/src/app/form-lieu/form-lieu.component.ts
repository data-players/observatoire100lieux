import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DataProviderService} from '../data-provider.service';
import {Organization} from '../model/organization.model';
import {Person} from '../model/person.model';
import {Sector} from '../model/sector.model';
import {Domain} from '../model/domain.model';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-lieu',
  templateUrl: './form-lieu.component.html',
  styleUrls: ['./form-lieu.component.scss']
})
export class FormLieuComponent implements OnInit {

  form!: FormGroup;
  sectors: Sector[] = []
  domains: Domain[] = []

  branchesSelected: string[] = [];
  domainsSelected: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataProviderService) { }

  async ngOnInit(): Promise<void> {
    this.sectors =await this.dataService.findAll<Sector>('sectors');
    this.domains = await this.dataService.findAll<Domain>('domains');
    console.log('WTF', ([] as FormControl[]).concat(...this.sectors.map(s =>(s.extendedBy.map(b => this.fb.control(b.id))))))
    this.form = this.fb.group({
      'pair:id': [],
      'pair:label': [],
      'pair:description': [],
      'pair:homepage': [],
      '100lieux:timetable': [],
      '100lieux:accessRules':[],
      'pair:phone': [],
      'pair:email': [],
      'pair:hasBranch': this.fb.array(([] as FormControl[]).concat(...this.sectors.map(s =>(s.extendedBy.map(b => this.fb.control(false)))))),
      'pair:hasDomain': this.fb.array([([] as FormControl[]).concat(...this.domains.map(d => this.fb.control([false])))]), // TODO: add to form
      'pair:hasLocation':
      this.fb.group({
        '@type':['pair:Place'],
        'pair:hasPostalAddress': this.fb.group({
            '@type':['pair:PostalAddress'],
            'pair:label': [],
            'pair:addressCountry': ['France'],
            'pair:addressZipcode': [],
            'pair:addressStreet': [],
            'pair:latitude': [],
            'pair:longitude': [],
          }),
          'pair:hasDigitalPlace':this.fb.array(
          [
            this.fb.group(
              {
                '@type':['pair:DigitalPlace'],
                'pair:label': [],
                'pair:page': []
              },
            )
          ])
        }),
    })
  }

  get comments(){
    return this.form.controls['pair:comment']
  }
  get digitalPlaces(): FormArray{
    return (this.form.controls['pair:hasLocation'] as FormGroup).controls['pair:hasDigitalPlace'] as FormArray
  }

 async submit(){
    const provider = new OpenStreetMapProvider();

    const values = this.form.value;
    const response = await provider.search({query: this.getLongLat(values['pair:hasLocation']['pair:hasPostalAddress'])})
     if(response !== null && response[0].bounds !== null){
      values['pair:hasLocation']['pair:hasPostalAddress']['pair:latitude'] = response[0].bounds[0][0];
      values['pair:hasLocation']['pair:hasPostalAddress']['pair:longitude'] = response[0].bounds[0][1];
     }

    values['pair:hasBranch'] = this.branchesSelected;
    values['pair:hasDomain'] = this.branchesSelected;
    await this.dataService.create<Organization>('organizations', values, 'Organization')
   this.router.navigate(['/map']);
   console.log(this.form.value);
  }


  private getLongLat(addresse: {[key: string]: string}): string{
    console.log(`${addresse['pair:addressStreet']}, ${addresse['pair:addressZipcode']}, France`);
    return `${addresse['pair:addressStreet']}, ${addresse['pair:addressZipcode']}, France`;
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
    console.log(this[what ==='branch' ?'branchesSelected'  : 'domainsSelected'])
  }

  addSocialNetwork() {
    this.digitalPlaces.push( this.fb.group(
      {
        '@type':['pair:DigitalPlace'],
        'pair:label': [],
        'pair:page': []
      }));
  }
}
