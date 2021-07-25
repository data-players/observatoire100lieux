import {Component, ComponentFactoryResolver, Injector, OnInit} from '@angular/core';
import {Organization} from '../../../model/organization.model';
import {MapAction, MapService} from '../../../services/map.service.';
import {DataProviderService} from '../../../services/data-provider.service';
import {debounce} from 'rxjs/operators';
import {timer} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {UiService} from '../../ui/ui.service';

@Component({
  selector: 'app-list-lieu',
  templateUrl: './list-lieu.component.html',
  styleUrls: ['./list-lieu.component.scss']
})
export class ListLieuComponent implements OnInit {

  organizations: Organization[] = []
  orgafiltered: Set<Organization> = new Set()
  length = 500;
  pageIndex = 0;
  pageSize = 10
  showFirstLastButtons = false;

  constructor(public dataProvider: DataProviderService, private mapService: MapService, private uiService: UiService) { }

  async ngOnInit(): Promise<void> {
    this.uiService.showSpinner()
    this.organizations = await this.dataProvider.findAll<Organization>('organizations')
    this.orgafiltered = new Set(this.organizations);
    this.length = this.orgafiltered.size
    this.mapService.mapFilter.pipe(debounce( o =>timer(100))).subscribe(filters => {
      this.filter(filters)
    })
    this.filter({
      pageIndex: [this.pageIndex+'']
    })
    this.uiService.stopSpinner()
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageIndex = event.pageIndex;

    this.filter({
      pageIndex: [this.pageIndex+'']
    })
  }

  private async filter(filters?: {[key:string]: string[]}) {
    this.orgafiltered = new Set()
    if (filters && filters["branches"] && (filters["branches"].length !== 0 || (filters["domains"].length !== 0))) {
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

    if(this.orgafiltered.size >= this.pageSize){
      const tools = Array.from(this.orgafiltered)
      const result = tools.filter((t, i) =>  i < ((+this.pageIndex+ 1) * this.pageSize)  && i >= ((+this.pageIndex+ 1) * this.pageSize)-this.pageSize )
      this.orgafiltered = new Set(result);

    }
  }

  }
