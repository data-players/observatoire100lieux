import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {MapService} from '../map.service.';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-form-side-bar-tiers-lieux',
  templateUrl: './form-side-bar-tiers-lieux.component.html',
  styleUrls: ['./form-side-bar-tiers-lieux.component.scss']
})
export class FormSideBarTiersLieuxComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private mapService: MapService) {
  }

  async ngOnInit(): Promise<void> {
    this.buildForm();
    console.log(this.form.value)
  }

  private buildForm(): void {
    for(let elem of this.TREE_DATA) {
      const form = new FormGroup({})
      for (let f of elem.value){
        form.addControl(f.id+'', this.fb.control(false));
      }
      this.form.addControl(elem.id, form)
    }
  }

  log(val:any): void {
    console.log('-->', val);
  }
  getFormControls(g: AbstractControl): { [p: string]: AbstractControl } {
    return (g as FormGroup).controls;
  }

  TREE_DATA: {id: string, name: string, value: {id: string, name: string}[] }[]=
    [
      {
        id:'a1',
        name: 'Production',
        value:[
          {id: 'http://wwwmlkmfksdmgkl   ', name: 'Maraîchage'},
          {id: 'http://dsmflk.com', name: 'Apiculture'},
          {id: '30', name: 'Agroforesterie'},
          {id: '40', name: 'Pépinière'},
          {id: '50', name: 'Hydroponie'},
          {id: '60', name: 'Aquaponie'},
          {id: '70', name: 'Elevage'},
        ]
      },
      {
        id:'a2',
        name: 'Transformation',
        value: [
          {id: '80', name: 'Compostage'},
          {id: '90', name: 'Transformation alimentaire'},
          {id: '100', name: 'Ecoconstruction'}
        ]
      },
      {
        id:'a3',
        name: 'Distribution',
        value: [
          {id: '110', name: 'Restauration'},
          {id: '120', name: 'Vente'}
        ]
      },
      {
        id:'a4',
        name: 'Animation',
        value: [
          {id: '130', name: 'Activités pédagogiques'},
          {id: '140', name: 'Activités cultureles'}
        ]
      }
    ];

  getTreeValue(grpId: string, itemId?: string): string {
    let result = this.TREE_DATA.find(v => v.id === grpId);
    if(itemId) {
      const result2 = result?.value.find( v => v.id === itemId)
      return result2 ? result2.name : '';
    }
    return  result ? result.name : ''
  }

  detectMyPosition() {
    this.mapService.asksForUserPosition();
  }

  /**
   * Checkboxes managment
   * @param formGroup
   * @param checked
   */
  toggleCheckbox(formGroup: AbstractControl, checked: boolean) {
    const formControl: AbstractControl[] = Object.values((formGroup as FormGroup).controls)
    formControl.forEach( v => v.setValue(checked));
  }
  allComplete(formGroup: AbstractControl) {
    const formControl: AbstractControl[] = Object.values((formGroup as FormGroup).controls)
    return formControl.every(t => t.value === true)
  }
  updateAllComplete(formGroup: AbstractControl, cb: MatCheckbox) {
    if(this.allComplete(formGroup)){
      cb.checked = true;
      console.log("weee")
    }
  }
  someComplete(formGroup: AbstractControl) {
    const formControl: AbstractControl[] = Object.values((formGroup as FormGroup).controls)
    return formControl.filter( v=> v.value === true).length >= 1 &&
      formControl.filter( v=> v.value === true).length !== formControl.length
  }
}
