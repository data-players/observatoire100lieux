import { Component, OnInit } from '@angular/core';
//import * as L from 'leaflet';
import {MapService} from '../map.service.';
declare const L: any;
import 'leaflet.locatecontrol/src/L.Control.Locate';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const centlieuxmap = L.map('centlieuxmap').setView([50.6311634, 3.0599573], 27);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'La bouffe miamiam'
    }).addTo(centlieuxmap);
    L.control.locate().addTo(centlieuxmap);

    this.mapService.userPositionEmt.subscribe(p => {
      console.log('todo')
    })
  }


}
