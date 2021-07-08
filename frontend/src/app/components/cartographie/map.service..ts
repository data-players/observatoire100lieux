import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export enum MapAction {
  LOAD,
  UPDATE
}
@Injectable({
  providedIn: 'root'
})
export class MapService {

  private $mapAction: EventEmitter<MapAction> = new EventEmitter<MapAction>()
  private $mapFilter: EventEmitter<{[key:string]: string[]}> = new EventEmitter<{[key:string]: string[]}>()

  constructor() {
  }

  action(action: MapAction): void {
    this.$mapAction.emit(action);
  }
  get mapAction(): EventEmitter<MapAction> {
    return this.$mapAction;
  }
  get mapFilter(): EventEmitter<{ [p: string]: string[] }> {
    return this.$mapFilter;
  }

}
