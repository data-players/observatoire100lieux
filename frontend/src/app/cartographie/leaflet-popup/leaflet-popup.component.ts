import {Component, Input, OnInit} from '@angular/core';
import {Organization} from '../../model/organization.model';

@Component({
  selector: 'app-leaflet-popup',
  templateUrl: './leaflet-popup.component.html',
  styleUrls: ['./leaflet-popup.component.scss']
})
export class LeafletPopupComponent implements OnInit {

  @Input() organization!: Organization

  constructor() { }

  ngOnInit(): void {
  }

}
