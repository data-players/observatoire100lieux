import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MapAction, MapService} from '../../../services/map.service.';
import {MatCheckbox} from '@angular/material/checkbox';
import {DataProviderService} from '../../../services/data-provider.service';
import {Sector} from '../../../model/sector.model';
import {Domain} from '../../../model/domain.model';
import {of, timer} from 'rxjs';
import {debounce, tap} from 'rxjs/operators';

@Component({
  selector: 'app-form-side-bar-tiers-lieux',
  templateUrl: './form-side-bar-tiers-lieux.component.html',
  styleUrls: ['./form-side-bar-tiers-lieux.component.scss']
})
export class FormSideBarTiersLieuxComponent implements OnInit {
  formBranches: FormGroup = new FormGroup({});
  formDomains: FormGroup = new FormGroup({});
  sectors : Sector[] = []
  domains : Domain[] = []
  filterForm = new FormControl('');

  constructor(private fb: FormBuilder, private mapService: MapService, private dataProvider: DataProviderService) {
  }

  async ngOnInit(): Promise<void> {
    this.sectors = await this.dataProvider.findAll('sectors');
    this.domains = await this.dataProvider.findAll('domains');
    await this.buildForm();
    this.mapService.action(MapAction.LOAD);
    this.formBranches.valueChanges.subscribe(v => this.sendValues());
    this.filterForm.valueChanges.pipe(
      debounce( o => timer(600)))
      .subscribe( o=> {
          this.sendValues();
      });
  }

  private buildForm(): Promise<void> {
    return new Promise((res, rej) => {
      for(let s of this.sectors) {
        const form = new FormGroup({})
        for (let b of s.extendedBy){
          form.addControl(b.id+'', this.fb.control(false));
        }
        this.formBranches.addControl(s.id, form)
      }
      for(let s of this.domains) {
        this.formDomains.addControl(s.id+'', this.fb.control(false));
      }
      res.apply(true);
    })
  }

  getFormControls(g: AbstractControl): { [p: string]: AbstractControl } {
    return (g as FormGroup).controls;
  }

  getSectorTreeValue(grpId: string, itemId?: string): string {
    let result = this.sectors.find(v => v.id === grpId);
    if(itemId) {
      const result2 = result?.extendedBy.find( v => v.id === itemId)
      return result2 ? result2.label : '';
    }
    return  result ? result.label : ''
  }

  getDomainLabel(id: string): string {
    const find = this.domains.find(d => d.id === id);
    return find ? find.label : '';
  }

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
    console.log(formGroup)
      cb.checked = true;
    }
  }
  someComplete(formGroup: AbstractControl) {
    const formControl: AbstractControl[] = Object.values((formGroup as FormGroup).controls)
    return formControl.filter( v=> v.value === true).length >= 1 &&
      formControl.filter( v=> v.value === true).length !== formControl.length
  }

  sendValues(){
    let formBranchctrl: {[key: string]: boolean} = {};
    (Object.values(this.formBranches.value) as {[key: string]: boolean}[]).forEach(
      obj  => {
        Object.assign(formBranchctrl, obj)
      }
    );
    const formDomainctrl = this.formDomains.value;
    this.mapService.mapFilter.emit({
      filterstr: [this.filterForm.value],
      branches: Object.keys(formBranchctrl).filter(k => formBranchctrl[k as any]),
      domains: Object.keys(formDomainctrl).filter(k => formDomainctrl[k])
    });
  }

  sendFilterStr(target: any) {

  }
}
