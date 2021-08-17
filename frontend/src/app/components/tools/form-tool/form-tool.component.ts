import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Organization} from '../../../model/organization.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DataProviderService} from '../../../services/data-provider.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {data} from '../../../data';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {UiService} from '../../ui/ui.service';
import {ConfirmDialogComponent} from '../../ui/confirm-dialog/confirm-dialog.component';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-form-tool',
  templateUrl: './form-tool.component.html',
  styleUrls: ['./form-tool.component.scss']
})
export class FormToolComponent implements OnInit {

  @ViewChild("tagsInput") tagsInput!: ElementRef;
  @ViewChild("orgsInput") orgsInput!: ElementRef;

  themeGroup = data.themeGroup;
  populationTarget = data.populationTarget;
  format = data.format;
  cost = data.cost;
  toolType = data.toolType;
  allTags:any[] = []
  allTagsSelect:any[] = []
  selectedTags: { [key: string]: string }[] = []

  allOrganizations:any[] = [];
  allOrganizationsSelect:any[] = [];
  selectedOrganizations: { [key: string]: string }[] = []

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild("formElem") formElem!: ElementRef;
  fileName: string = ''
  formDataFile = new FormData();
  form!: FormGroup;
  tagCtrl = new FormControl();
  organizationCtrl = new FormControl()

  editedTool: any;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private uiService: UiService,
              private dataService: DataProviderService,
              private authService: AuthService,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService) {}

  async ngOnInit(): Promise<void> {
    this.uiService.showSpinner()
    const param = this.activatedRoute.snapshot.paramMap.get('id')
    this.bcService.set('/tools/edit/:id', 'loading')
    if (param) {
      this.editedTool = await this.dataService.findOne('tools', param)
      if (this?.editedTool['@id']) this.bcService.set('/tools/edit/:id', `Edition: ${this.editedTool['pair:label']}`)
      this.selectedOrganizations = this.editedTool['pair:offeredBy'] ? this.editedTool['pair:offeredBy'] : [];
    }
    const allOrganizations = await this.dataService.findAll('organizations')
    const allTags = await this.dataService.findAll('themes');
    this.allTagsSelect = allTags
    this.allOrganizationsSelect = this.allOrganizations = allOrganizations;

    this.tagCtrl.valueChanges.subscribe( value => {
      this.allTagsSelect = this._filterTag(value);
    })
    this.organizationCtrl.valueChanges.subscribe( value => {
      this.allOrganizationsSelect = this._filterOrg(value);
    })


    if (this?.editedTool) {
      if(this.editedTool['pair:hasTopic']){
        if(!Array.isArray(this.editedTool['pair:hasTopic'])){
          this.editedTool['pair:hasTopic'] = [this.editedTool['pair:hasTopic']]
        }
        this.allTags = allTags.filter(n => !this.editedTool['pair:hasTopic'].includes(n));
        this.selectedTags = this.editedTool['pair:hasTopic'];
      }else{
        this.allTags = allTags;
      }
      this.selectedOrganizations = Array.isArray(this.selectedOrganizations) ? this.selectedOrganizations : [this.selectedOrganizations]
    }else{
      this.allTags = allTags;
    }

    this.form = this.fb.group({
      '@id': [this.getValueFromObj('@id')],
      'pair:label': [this.getValueFromObj('pair:label'), Validators.required],
      'pair:description': [this.getValueFromObj('pair:description'), Validators.required],
      'pair:hasDomain':this.fb.group({
        '@type': ['pair:Domain'],
        'pair:label' : [this.getValueFromObj('pair:hasDomain')['pair:label'], Validators.required]
      }),
      'pair:hasTopic': this.fb.array([]),
      '100lieux:aspect': [this.getValueFromObj('100lieux:aspect'), Validators.required],
      '100lieux:audience': [this.getValueFromObj('100lieux:audience'), Validators.required],
      '100lieux:format': [this.getValueFromObj('100lieux:format'), Validators.required],
      '100lieux:cost': [this.getValueFromObj('100lieux:cost'), Validators.required],
      '100lieux:year': [this.getValueFromObj('100lieux:year'), Validators.required],
      'pair:homePage':[this.getValueFromObj('pair:homePage')],
      'pair:producedBy': this.fb.group({
        '@type': ['pair:Actor'],
        'pair:label': [this.getActorLabel(), Validators.required],
      }),
      'pair:offeredBy': this.fb.array([]),
      'pair:documentedBy': [this.getValueFromObj('pair:documentedBy')],
    })
    this.uiService.stopSpinner()

  }

  private _filterTag(value: any): {[key: string]:string }[] {
    if(typeof value !== 'string')
      value = '';
    let filteredTag = this.allTags;
    if(value){
      const filterValue = value.toLowerCase();
      filteredTag = this.allTags.filter(tag => tag['pair:label'].toLowerCase().includes(filterValue));
    }
    return filteredTag.filter(n => !this.selectedTags.includes(n));
  }

  private _filterOrg(value: any): {[key: string]:string }[] {
    if(typeof value !== 'string')
      value = '';
    let filteredOrg = this.allOrganizations;
    if(value){
      const filterValue = value.toLowerCase();
      filteredOrg = this.allOrganizations.filter(org => org['pair:label'].toLowerCase().includes(filterValue));
    }
    return filteredOrg.filter(n => !this.selectedOrganizations.includes(n));
  }

  getValueFromObj(attribute: string){
    return this.editedTool ?
                      this.editedTool[attribute]
                        ? this.editedTool[attribute] :
                        '' :
                      ''
  }

  getActorLabel() {
    if(!this?.editedTool) return '';
    const editedToolElement = this?.editedTool['pair:producedBy'];

    if (editedToolElement){
      if(editedToolElement['pair:label'])  {
        return editedToolElement['pair:label'];
      }
    }
    return ''
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.viewValue, this.allTags)
    const tag = this.allTags.find(t => t['pair:label'] === event.option.viewValue);
    if(tag){
      this.selectedTags.push(tag);
    }
    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  selectedOrganization(event: MatAutocompleteSelectedEvent): void {
    const orga = this.allOrganizations.find(t => t['pair:label'] === event.option.viewValue.split(',')[0]);
    if(orga){
      this.selectedOrganizations.push(orga);
    }
    this.orgsInput.nativeElement.value = '';
    this.organizationCtrl.setValue(null);
  }

  removeTag(tag: any) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeOrganization(tag: any) {
    const index = this.selectedOrganizations.indexOf(tag);
    if (index >= 0) {
      this.selectedOrganizations.splice(index, 1);
    }
    this.orgsInput.nativeElement.value = '';
    this.organizationCtrl.setValue(null);
  }

  addTag(event: MatChipInputEvent) {
    const value = (event?.value || '').trim();
    const tag = this.allTags.find( t => {
      return t['pair:label'] === value
    })
    if(tag) {
      this.selectedTags.push(tag)
    }
    event.chipInput!.clear();
    this.form.controls['pair:hasTopic'].setValue(null);
  }

  addOrganization(event: MatChipInputEvent) {
    const value = (event?.value || '').trim();
    const org = this.allOrganizations.find( t => {
      return t['pair:label'] === value
    })
    if(org) {
      this.selectedOrganizations.push(org)
    }
    event.chipInput!.clear();
    this.form.controls['pair:offeredBy'].setValue(null);
  }

  async submit(){
    this.uiService.showSpinner()
    this.submitted = true;
    const values = this.form.value;

    if(this.form.valid){
      if(this.fileName) {
        let response: { [p: string]: string } = await this.postPicture();
        values['pair:documentedBy'] = response;
      }

      values['pair:hasTopic'] = this.selectedTags.map( v => v['@id']);
      values['pair:offeredBy'] = this.selectedOrganizations.map( v => v['@id']);

      if(this?.editedTool && this?.editedTool['@id']) {
        await this.dataService.update<Organization>('tools', values, this.dataService.extractUrlHash(this.editedTool['@id']), 'Resource')
      }else{
        await this.dataService.add<Organization>('tools', values, 'Resource');
      }
      this.uiService.stopSpinner()
      await this.router.navigateByUrl('/tools');
    }else{
      this.formElem.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
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
    const file:File =  this.fileInput.nativeElement.files[0];
    formData.append("file", file);
    console.log(file);
    return this.dataService.postFile('files', formData)
  }

  async confirmSuppr() {
    if(this.form.valid) {
      const task = (this.editedTool?.id) ? 'd\'éditer' : 'd\'ajouter'
      if(!this.authService.currentUserValue){
        const dialogRef= this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: `Vous êtes sur le point ${task} un outil. Celui ci devra être validé par un administrateur avant de pouvoir être ajouter dans notre base la carte. Cliquez sur valider pou confirmer`,
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
              title: "100 lieux nourriciers: Un outil attend une action de votre part",
              content: "Un outil attend une action de votre part: https://100lieuxnourriciers.fr/admin/pending",
            }, 'mailer')
          }
        });
      }else{
        this.submit()
      }
    }
  }
  getCity(org: any) {
    if(Array.isArray(org)){
      org = org[0];
    }
    if(!org) return ''
    if(!org['pair:hasPostalAddress']) return '';
    return org ? org['pair:hasPostalAddress']['pair:locality'] : ''
  }
}
