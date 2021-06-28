import {Component, ComponentFactoryResolver, Injector, OnInit} from '@angular/core';
//import * as L from 'leaflet';
import {MapAction, MapService} from '../map.service.';
declare const L: any;
import 'leaflet.locatecontrol/src/L.Control.Locate';
import "leaflet.markercluster";

import {Icon} from 'leaflet';
import {DataProviderService} from '../../data-provider.service';
import {Organization} from '../../model/organization.model';
import {LeafletPopupComponent} from '../leaflet-popup/leaflet-popup.component';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {

  organizations: Organization[] = []

  constructor(private mapService: MapService, private dataProvider: DataProviderService, private injector: Injector, private resolver: ComponentFactoryResolver) { }

  async ngOnInit(): Promise<void> {
    this.organizations = await this.dataProvider.findAll<Organization>('organizations')
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    console.log('LOAD ORGA')

    this.mapService.userPositionEmt.subscribe(p => {
     if(p == MapAction.LOAD) {
       console.log('LOAD MAP')

       this.createMap();
     }
    })
  }

  getLatLong(obj: any): number[]{
    return ([] as number[]).concat(
      obj['hasLocation']['hasPostalAddress']['latitude'],
      obj['hasLocation']['hasPostalAddress']['longitude']
    );
  }

  private createMap(): void{
    const centlieuxmap = L.map('centlieuxmap').setView([46.6311634, 4.0599573], 6);
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      iconSize: [24,36],
      iconAnchor: [12,36]
    });
    var markers = L.markerClusterGroup();
    let component = undefined;
    this.organizations.forEach( o => {
      const coords = this.getLatLong(o);
      component = this.resolver.resolveComponentFactory(LeafletPopupComponent).create(this.injector);
      component.instance.organization = o;
      component.changeDetectorRef.detectChanges();
      if(coords.length === 2){
        markers.addLayer(L.marker(
          L.latLng(coords[0], coords[1]),
          {icon: myIcon }
        ).bindPopup(this.createCustomPopup(o)));
      }
    })
    var newMarker = new L.marker(L.latLng(50.5, 30.5), {icon: myIcon }).addTo(centlieuxmap);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'La bouffe miamiam'
    }).addTo(centlieuxmap);
    L.control.locate().addTo(centlieuxmap);
    centlieuxmap.addLayer(markers)
  }

  private createCustomPopup(o: Organization) {
    const factory = this.resolver.resolveComponentFactory(LeafletPopupComponent);
    const component = factory.create(this.injector);
    component.instance.organization = o;

    component.changeDetectorRef.detectChanges();

    return component.location.nativeElement;
  }

}
