import {Component, ComponentFactoryResolver, Injector, OnInit} from '@angular/core';
import {Organization} from '../../../model/organization.model';
import {MapAction, MapService} from '../map.service.';
import {DataProviderService} from '../../../services/data-provider.service';
import {debounce} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-list-lieu',
  templateUrl: './list-lieu.component.html',
  styleUrls: ['./list-lieu.component.scss']
})
export class ListLieuComponent implements OnInit {

  organizations: Organization[] = []
  orgafiltered: Set<Organization> = new Set()

  constructor(public dataProvider: DataProviderService, private mapService: MapService) { }

  async ngOnInit(): Promise<void> {
    this.organizations = await this.dataProvider.findAll<Organization>('organizations')
    this.orgafiltered = new Set(this.organizations);
    this.mapService.mapFilter.pipe(debounce( o =>timer(100))).subscribe(filters => {
      this.displayMarkers(filters)
    })
  }

  private async displayMarkers(filters?: {[key:string]: string[]}) {
    this.orgafiltered = new Set()
    if (filters && (filters["branches"].length !== 0 || (filters["domains"].length !== 0))) {
      this.organizations.filter(o => {
        return o.hasBranch.some(
          b => filters['branches'].includes(b.id)
        ) || o.hasDomain.some(
          d => filters['domains'].includes(d.id))
      }).forEach(o => this.orgafiltered.add(o));
    } else {
      this.orgafiltered = new Set(this.organizations)
    }

    if (!!filters && filters['filterstr'] && (filters["filterstr"][0] !== '')) {
      this.orgafiltered = new Set([...this.orgafiltered].filter(o => o.label.toLowerCase().search(filters['filterstr'][0].toLowerCase()) !== -1));
    }
  }

  }
