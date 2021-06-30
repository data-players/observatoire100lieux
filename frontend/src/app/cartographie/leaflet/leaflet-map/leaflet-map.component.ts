import {
  AfterContentChecked,
  AfterViewChecked, AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector, OnDestroy,
  OnInit
} from '@angular/core';
//import * as L from 'leaflet';
import {MapAction, MapService} from '../../map.service.';
declare const L: any;
import 'leaflet.locatecontrol/src/L.Control.Locate';
import "leaflet.markercluster";

import {Icon} from 'leaflet';
import {DataProviderService} from '../../../data-provider.service';
import {Organization} from '../../../model/organization.model';
import {LeafletPopupComponent} from '../leaflet-popup/leaflet-popup.component';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnDestroy{

  organizations: Organization[] = []

  constructor(private mapService: MapService, private dataProvider: DataProviderService, private injector: Injector, private resolver: ComponentFactoryResolver) { }

  ngOnDestroy(): void {
    /*const elementById = document.getElementById('centlieuxmap');
    if(elementById){
      elementById.innerHTML = ''
    }*/
  }

  async ngOnInit(): Promise<void> {
    this.mapService.mapAction.subscribe(p => {
      if(p == MapAction.LOAD) {
        this.dataProvider.findAll<Organization>('organizations').then(o=> {
          this.organizations = o;
          this.createMap();
        })
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
