import { Component, OnInit } from '@angular/core';
import {ActionType, DataProviderService} from '../../../services/data-provider.service';
import {Organization} from '../../../model/organization.model';
import {Branch} from '../../../model/branch.model';
import {Domain} from '../../../model/domain.model';
import _ from 'lodash';
import {Action} from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-pending-places',
  templateUrl: './pending-places.component.html',
  styleUrls: ['./pending-places.component.scss']
})
export class PendingPlacesComponent implements OnInit {

  step = 0;
  organizations: { [index: string]:any }[] = [];
  loaded = false;

  constructor(private dataProvider: DataProviderService) { }

  async ngOnInit(): Promise<void> {
    this.organizations = await this.dataProvider.findAll('pendingorganizations')
    this.loaded = true;
    this.organizations.sort( (oa, ob)=> oa.label < ob.label ? 1 : -1);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setActionIcon(o: {[key: string]: any}) {
    switch (o['100lieux:flag']) {
      case ActionType.NEW :
        return 'queue'
      case ActionType.UPDATE:
        return 'edit'
      case ActionType.DELETE:
        return 'deleteforever'

    }
    return ;
  }
  getAction(o: {[key: string]: any}) {
    switch (o['100lieux:flag']) {
      case ActionType.NEW :
        return 'new'
      case ActionType.UPDATE:
        return 'edit'
      case ActionType.DELETE:
        return 'delete'

    }
    return ;
  }
  getColor(o: {[key: string]: any}) {
    switch (o['100lieux:flag']) {
      case ActionType.NEW :
        return 'primary'
      case ActionType.UPDATE:
        return 'accent'
      case ActionType.DELETE:
        return 'warn'
    }
    return ;
  }
  getObjectKeys(o: {[key: string]: any}) {
    return Object.keys(o);
  }
  getObjectValue(o: {[key: string]: any}, key: string) {
    return o[key];
  }

  async validateElement(o: { [p: string]: any }) {
    const action = o['100lieux:flag']
    const id = this.dataProvider.extractUrlHash(o['@id']);
    if(action === ActionType.NEW || action === ActionType.UPDATE){
      let obj = _.cloneDeep(o);
      obj = this.addPairPrefix(obj);
      if(!Array.isArray(o['pair:hasBranch'])){
        obj['pair:hasBranch'] = [].concat(o['pair:hasBranch'])
      }
      if(!Array.isArray(o['pair:hasDomain'])){
        obj['pair:hasDomain'] = [].concat(o['pair:hasDomain'])
      }
      obj['pair:hasBranch'] = (obj['pair:hasBranch'] as Branch[]).map(v =>{return v.id});
      obj['pair:hasDomain'] = (obj['pair:hasDomain'] as Domain[]).map(v => v.id);

      _.unset(obj,'100lieux:flag');
      _.unset(obj,'@id');
      _.unset(obj,'pair:id');
      _.unset(obj,'@type');
      if(action === ActionType.NEW){
        await this.dataProvider.add('organizations', obj, 'Organization')
        await this.dataProvider.delete('pendingorganizations', obj, id, 'Organization')
      }else{
        await this.dataProvider.update('organizations', obj, id, 'Organization')
        await this.dataProvider.delete('pendingorganizations', obj, id, 'Organization')
      }
    }else{
      await this.dataProvider.delete('organizations', {}, id, 'Organization')
      await this.dataProvider.delete('pendingorganizations', {}, id, 'Organization')
    }
    this.organizations = await this.dataProvider.findAll<Organization>('pendingorganizations');


  }
  addPairPrefix(o: { [key: string]: any}): { [key: string]: any}{
    return _.transform(o, (result: { [key: string]: any }, value: string | number | [] | {}, key: string) => {
      if(typeof key === 'string' && (key.startsWith('pair:') || key.startsWith('100lieux:') || key.startsWith('@id') || key.startsWith('@type'))) {
       if (typeof value === 'object' && !Array.isArray(value)) {
         result[key] = this.addPairPrefix(value);
       } else if (typeof value === 'string'|| typeof value === 'number' || typeof value === 'boolean'|| Array.isArray(value)) {
         result[key] = value;
       }
     }
      return result
     });
      }

  async cancelElement(o: { [p: string]: any }) {
    await this.dataProvider.delete('pendingorganizations', o, this.dataProvider.extractUrlHash(o.id), 'Organization')
    this.organizations = await this.dataProvider.findAll<Organization>('pendingorganizations');
  }
}
