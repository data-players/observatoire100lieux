import {EventEmitter, Injectable} from '@angular/core';


export enum MapAction {
  LOAD,
}
@Injectable({
  providedIn: 'root'
})
export class MapService {

  userPositionEmt = new EventEmitter()

  constructor() { }

  action(action: MapAction): void {
    this.userPositionEmt.emit(action);
  }
}
