import { Component, OnInit } from '@angular/core';
import {data} from '../../../data';
import {FormControl} from '@angular/forms';
import {debounce} from 'rxjs/operators';
import {timer} from 'rxjs';
import {FilterType, ToolsService} from '../../../services/tools.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-form-side-bar-list-tools',
  templateUrl: './form-side-bar-list-tools.component.html',
  styleUrls: ['./form-side-bar-list-tools.component.scss']
})
export class FormSideBarListToolsComponent implements OnInit {

  themeGroup = data.themeGroup;
  populationTarget = data.populationTarget;
  format = data.format;
  cost = data.cost;
  toolType = data.toolType;

  themeGroupFilters:string[] =[];
  populationTargetFilters:string[] = [];
  formatFilters:string[] = [];
  costFilters:string[] = [];
  toolTypeFilters:string[] = [];
  textFilter: string[] = []

  FilterType = FilterType;

  filterForm = new FormControl('');
  selectinput: any;

  constructor(private toolsService: ToolsService) { }

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      debounce( o => timer(1000)))
      .subscribe( o=> {
        if(o){
          this.textFilter = [o]
          this.sendValues();
        }
      });
    this.toolsService.toolsFilterRemove.subscribe(v =>{
      const value = v['value']
      const type = v['type']
      switch(type) {
        case this.FilterType.TOOL:
          if(this.toolTypeFilters.indexOf(value as string) > -1){
            this.toolTypeFilters.splice(this.toolTypeFilters.indexOf(value as string), 1);
            this.toolType.push(value as string)
            this.toolType.sort()
          }
          break;
        case this.FilterType.COST:
          if(this.costFilters.indexOf(value as string) > -1) {
            this.costFilters.splice(this.costFilters.indexOf(value as string), 1);
            this.cost.push(value as string)
            this.cost.sort()
          }
          break;
        case this.FilterType.FORMAT:
          if(this.formatFilters.indexOf(value as string) > -1){
            this.formatFilters.splice(this.formatFilters.indexOf(value as string), 1);
            this.format.push(value as string)
            this.format.sort()
          }
          break;
        case this.FilterType.THEME:
          console.log('THEME', this.themeGroupFilters.indexOf(value as string), this.themeGroupFilters);
          if(this.themeGroupFilters.indexOf(value as string) > -1) {
            this.themeGroupFilters.splice(this.themeGroupFilters.indexOf(value as string), 1);
            this.themeGroup.push(value as string)
            this.themeGroup.sort()
          }
          break;
        case this.FilterType.POPULATION:
          if(this.populationTargetFilters.indexOf(value as string) > -1) {
            this.populationTargetFilters.splice(this.populationTargetFilters.indexOf(value as string), 1);
            this.populationTarget.push(value as string)
            this.populationTarget.sort()
          }
          break;
        case this.FilterType.TEXT:
          this.textFilter = []
          break;
      }
    this.selectinput = ''
    this.sendValues()
    })
  }

  sendValues(){
    console.log('FILTERS?', this.themeGroupFilters, this.populationTargetFilters, this.formatFilters, this.costFilters, this.toolTypeFilters)

    this.toolsService.toolsFilter.emit({
      [this.FilterType.TOOL]: this.toolTypeFilters,
      [this.FilterType.POPULATION]: this.populationTargetFilters,
      [this.FilterType.FORMAT]: this.formatFilters,
      [this.FilterType.THEME]: this.themeGroupFilters,
      [this.FilterType.COST]: this.costFilters,
      [this.FilterType.TEXT]: this.textFilter,
    });
  }

  setFilter(filter: string, type: FilterType) {
    switch(type) {
      case this.FilterType.TOOL:
        this.toolTypeFilters.push(filter)
        this.toolType.splice(this.toolType.indexOf(filter), 1)
        break;
      case this.FilterType.COST:
        this.costFilters.push(filter)
        this.cost.splice(this.cost.indexOf(filter), 1)
        break;
      case this.FilterType.FORMAT:
        this.formatFilters.push(filter)
        this.format.splice(this.format.indexOf(filter), 1)
        break;
      case this.FilterType.THEME:
        this.themeGroupFilters.push(filter)
        this.themeGroup.splice(this.themeGroup.indexOf(filter), 1)
        break;
      case this.FilterType.POPULATION:
        this.populationTargetFilters.push(filter)
        this.populationTarget.splice(this.populationTarget.indexOf(filter), 1)
        break;
      case this.FilterType.TEXT:
        this.textFilter = [filter ? filter : '']
        break;
    }
    console.log(this.themeGroupFilters)
    this.sendValues()
  }
}
