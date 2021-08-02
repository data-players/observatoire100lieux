import {
  AfterContentChecked,
  AfterViewChecked, AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector, OnDestroy,
  OnInit
} from '@angular/core';
//import * as L from 'leaflet';
import {MapAction, MapService} from '../../../../services/map.service.';
declare const L: any;
import 'leaflet.locatecontrol/src/L.Control.Locate';
import "leaflet.markercluster";

import {Icon} from 'leaflet';
import {DataProviderService} from '../../../../services/data-provider.service';
import {Organization} from '../../../../model/organization.model';
import {LeafletPopupComponent} from '../leaflet-popup/leaflet-popup.component';
import {debounce} from 'rxjs/operators';
import {timer} from 'rxjs';
import {UiService} from '../../../ui/ui.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit{

  organizations: Organization[] = []
  markers = L.markerClusterGroup();
  centlieux = '';
  private centlieuxmap: any;

  constructor(private mapService: MapService, private dataProvider: DataProviderService, private injector: Injector, private resolver: ComponentFactoryResolver, private uiService: UiService) { }

  async ngOnInit(): Promise<void> {
    this.uiService.showSpinner()
    this.mapService.mapAction.subscribe(p => {
      if (p == MapAction.LOAD) {
        this.dataProvider.findAll<Organization>('organizations').then(o => {
          this.organizations = o;
          if(!this.centlieuxmap){
            this.createMap();
          }
          this.displayMarkers();
          this.uiService.stopSpinner()
        })
      }
    });
    this.mapService.mapFilter.pipe(debounce( o =>timer(100))).subscribe(filters => {
      this.displayMarkers(filters)
    })
  }

   private async displayMarkers(filters?: {[key:string]: string[]}) {
    let orgafiltered: Set<Organization> = new Set()
     console.log(orgafiltered, filters)

    if(filters && (filters["branches"].length !== 0 || (filters["domains"].length !== 0))){
      console.log(filters)
      this.organizations.filter( o => {
        return o.hasBranch.some(
          b =>  filters['branches'].includes(b.id)
         ) ||  o.hasDomain.some(
          d => filters['domains'].includes(d.id))
        }).forEach( o=> orgafiltered.add(o));
    }else{
      orgafiltered = new Set(this.organizations)
    }

    if(!!filters && filters['filterstr'] && (filters["filterstr"][0] !== '')){
      orgafiltered = new Set([...orgafiltered].filter( o =>  o.label.toLowerCase().search(filters['filterstr'][0].toLowerCase()) !== -1));
    }

    this.markers.clearLayers()
      orgafiltered.forEach(o => {
      const component = this.resolver.resolveComponentFactory(LeafletPopupComponent).create(this.injector);
      component.instance.organization = o;
      component.changeDetectorRef.detectChanges();
      const coords = this.getLatLong(o);
      const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
        iconSize: [24, 36],
        iconAnchor: [12, 36]
      });
      if (coords.length === 2) {
        this.markers.addLayer(L.marker(
          L.latLng(coords[0], coords[1]),
          {icon: myIcon}
        ).bindPopup(this.createCustomPopup(o)));
      }
    })
    this.centlieuxmap.addLayer(this.markers)
  }

  getLatLong(obj: any): number[]{
    return ([] as number[]).concat(
      obj['hasLocation']['hasPostalAddress']['latitude'],
      obj['hasLocation']['hasPostalAddress']['longitude']
    );
  }

  private createMap(): void{
    this.centlieuxmap = L.map('centlieuxmap').setView([46.6311634, 4.0599573], 6);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'La bouffe miamiam'
    }).addTo(this.centlieuxmap);
  }

  private addMarker(coords: number[]){
    L.control.locate().addTo(this.centlieuxmap);
    this.centlieuxmap.addLayer(this.markers)
  }

  private createCustomPopup(o: Organization) {
    const factory = this.resolver.resolveComponentFactory(LeafletPopupComponent);
    const component = factory.create(this.injector);
    component.instance.organization = o;

    component.changeDetectorRef.detectChanges();

    return component.location.nativeElement;
  }

}
