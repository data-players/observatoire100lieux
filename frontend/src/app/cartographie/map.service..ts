import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  userPositionEmt = new EventEmitter()

  constructor() { }

  asksForUserPosition(): void {
    this.userPositionEmt.emit();
  }
}
