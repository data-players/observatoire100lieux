import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from 'xng-breadcrumb';
import {ActivatedRoute} from '@angular/router';
import {Organization} from '../../model/organization.model';
import {DataProviderService} from '../../services/data-provider.service';

@Component({
  selector: 'app-detail-lieu',
  templateUrl: './detail-lieu.component.html',
  styleUrls: ['./detail-lieu.component.scss']
})
export class DetailLieuComponent implements OnInit {

  organization!: Organization
  constructor(private breadcrumbService: BreadcrumbService, private activatedRoute: ActivatedRoute, public dataprovider:DataProviderService) { }

  async ngOnInit(): Promise<void> {
    this.breadcrumbService.set('/map/:id','Details');

    this.activatedRoute.params.subscribe( p => {
      this.dataprovider.findOne<Organization>('organizations', p['id']).then(o => {
        this.organization = o;
        this.breadcrumbService.set('/map/:id', this.organization.label);
      })
    })
  }

  async deleteOrga() {
    this.dataprovider.delete('organizations', this.organization, this.dataprovider.extractUrlHash(this.organization.id), 'Organization')
  }
}
