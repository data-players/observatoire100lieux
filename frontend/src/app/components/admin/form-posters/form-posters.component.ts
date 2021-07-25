import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {data} from '../../../data';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataProviderService} from '../../../services/data-provider.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Organization} from '../../../model/organization.model';
import {Utils} from '../../../utils';

export enum FileType{
  Zip,Image
}

@Component({
  selector: 'app-form-posters',
  templateUrl: './form-posters.component.html',
  styleUrls: ['./form-posters.component.scss']
})
export class FormPostersComponent implements OnInit {

  @ViewChild("tagsInput") tagsInput!: ElementRef;

  populationTarget = data.populationTarget;
  format = data.format;
  cost = data.cost;
  toolType = data.toolType;

  allTags:any[] = []
  allTagsSelect:any[] = []
  selectedTags: { [key: string]: string }[] = []

  separatorKeysCodes: number[] = [ENTER, COMMA];

  fileNamePoster: string = ''
  @ViewChild("fileInputPoster") fileInputPoster!: ElementRef;
  @ViewChild("formElemPoster") formElemPoster!: ElementRef;

  fileNameZipfile: string = ''
  @ViewChild("fileInputZipfile") fileInputZipfile!: ElementRef;
  @ViewChild("formElemZipfile") formElemZipfile!: ElementRef;

  formDataFile = new FormData();
  form!: FormGroup;
  tagCtrl = new FormControl();

  editedPoster: any;
  submitted = false;
  u = new Utils();

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataProviderService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService) {}

  async ngOnInit(): Promise<void> {
    const param = this.activatedRoute.snapshot.paramMap.get('id')
    this.bcService.set('/poster/add/:id', 'loading')
    if (param) {
      this.editedPoster = await this.dataService.findOne('tools', param)
      if (this?.editedPoster['@id']) this.bcService.set('/tool/add/:id', `Edition: ${this.editedPoster['pair:label']}`)
    }
    const allTags = await this.dataService.findAll('themes');
    this.allTagsSelect = allTags

    this.tagCtrl.valueChanges.subscribe( value => {
      this.allTagsSelect = this._filterTag(value);
    })

    if (this?.editedPoster && Array.isArray(this.editedPoster['pair:hasTopic'])) {
      this.allTags = allTags.filter(n => !this.editedPoster['pair:hasTopic'].includes(n));
      this.selectedTags = this.editedPoster['pair:hasTopic'];
    }else{
      this.allTags = allTags;
    }

    this.form = this.fb.group({
      '@id': [this.getValueFromObj('@id')],
      'pair:label': [this.getValueFromObj('pair:label'), Validators.required],
      'pair:hasDomain':this.fb.group({
        '@type': ['pair:Domain'],
        'pair:label' : ['Affiche']
      }),
      '100lieux:aspect': [this.getValueFromObj('100lieux:aspect'), Validators.required],
      '100lieux:audience': [this.getValueFromObj('100lieux:audience'), Validators.required],
      '100lieux:format': [this.getValueFromObj('100lieux:format'), Validators.required],
      '100lieux:cost': [this.getValueFromObj('100lieux:cost'), Validators.required],
      'pair:hasTopic': this.fb.array(([] as FormControl[]).concat(...this.selectedTags.map(d => this.fb.control(d['@id'])))),
      'pair:documentedBy': [this.getValueFromObj('pair:documentedBy')],
      '100lieux:zipfile' : [this.getValueFromObj('100lieux:zipfile')]
    })
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

  getValueFromObj(attribute: string){
    return this.editedPoster ?
      this.editedPoster[attribute]
        ? this.editedPoster[attribute] :
        '' :
      ''
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    const tag = this.allTags.find(t => t['pair:label'] === event.option.viewValue);
    if(tag){
      this.selectedTags.push(tag);
    }
    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeTag(tag: any) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
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

  async submit(){
    this.submitted = true;
    const values = this.form.value;

    if(this.form.valid){
      if(this.fileNamePoster) {
        values['pair:documentedBy'] = await this.postFile(FileType.Image);
      }
      if(this.fileNameZipfile) {
        values['100lieux:zipfile'] = await this.postFile(FileType.Zip);
      }
      values['pair:hasTopic'] = this.selectedTags.map( v => v['@id']);

      if(this?.editedPoster && this?.editedPoster['@id']) {
        await this.dataService.update<Organization>('posters', values, this.dataService.extractUrlHash(this.editedPoster['@id']), 'Resource')
      }else{
        await this.dataService.add<Organization>('posters', values, 'Resource');
      }
      await this.router.navigateByUrl('/posters/add');
    }else{
      this.fileInputPoster.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
  }

  async onFileSelected(event: Event, type: string) {
    const inputEvent = (event.target as HTMLInputElement & EventTarget)
    if(inputEvent && inputEvent.files){
      const file:File =inputEvent.files[0];
      if (file) {
        if(type === 'Image'){
          this.fileNamePoster = this.fileInputPoster.nativeElement.value;
        }else {
            this.fileNameZipfile = this.fileInputZipfile.nativeElement.value;}
        }
      }
  }

  private async postFile(type: FileType): Promise<{[key: string]: string}> {
    const formData = new FormData();
    let file:File
    if(type === FileType.Image)
     file =  this.fileInputPoster.nativeElement.files[0];
    else{
     file =  this.fileInputZipfile.nativeElement.files[0];
    }
    formData.append("file", file);
    return this.dataService.postFile('files', formData)
  }

  retrieveData(poster: any) {
    this.editedPoster = poster;
    this.ngOnInit();

  }

  cancelEdit() {
    this.editedPoster = null;
    this.form.reset()
    this.selectedTags = []
    this.fileNamePoster = ''
    this.fileNameZipfile = ''
    this.fileInputZipfile.nativeElement.value = ''
    this.fileInputPoster.nativeElement.value = ''

  }
}
