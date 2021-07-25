import {EventEmitter, Injectable} from '@angular/core';

export enum FilterType {
  THEME, TOOL, POPULATION, FORMAT, COST, TEXT
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private $toolFilter: EventEmitter<{[key:string]: string[]}> = new EventEmitter<{[key:string]: string[]}>()
  private $toolFilterRemove: EventEmitter<{[key:string]: string | FilterType}> = new EventEmitter<{[key:string]: string | FilterType}>()

  constructor() { }

  get toolsFilter(): EventEmitter<{ [p: string]: string[] }> {
    return this.$toolFilter;
  }

  get toolsFilterRemove(): EventEmitter<{ [p: string]: string | FilterType }> {
    return this.$toolFilterRemove;
  }
}
