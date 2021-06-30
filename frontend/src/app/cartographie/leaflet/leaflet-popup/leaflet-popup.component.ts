import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Organization} from '../../../model/organization.model';
import {Utils} from '../../../utils';

@Component({
  selector: 'app-leaflet-popup',
  templateUrl: './leaflet-popup.component.html',
  styleUrls: ['./leaflet-popup.component.scss']
})
export class LeafletPopupComponent implements OnInit{

  @Input() organization!: Organization
  utils = new Utils();
  constructor() { }

  ngOnInit(): void {
  }

}
