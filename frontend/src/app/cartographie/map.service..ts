import {EventEmitter, Injectable} from '@angular/core';

export enum MapAction {
  LOAD,
}
@Injectable({
  providedIn: 'root'
})
export class MapService {

  private $mapAction: EventEmitter<MapAction> = new EventEmitter<MapAction>()

  constructor() {
    const subscription = this.$mapAction.subscribe(v => {
      console.log('SUBSCRIPTION', v)
    });
  }

  action(action: MapAction): void {
    this.$mapAction.emit(action);
  }
  get mapAction(): EventEmitter<MapAction> {
    return this.$mapAction;
  }
}
