import {Component, ComponentFactoryResolver, Injector, OnInit} from '@angular/core';
import {Organization} from '../../../model/organization.model';
import {MapAction, MapService} from '../map.service.';
import {DataProviderService} from '../../../services/data-provider.service';

@Component({
  selector: 'app-list-lieu',
  templateUrl: './list-lieu.component.html',
  styleUrls: ['./list-lieu.component.scss']
})
export class ListLieuComponent implements OnInit {

  organizations: Organization[] = []

  constructor(public dataProvider: DataProviderService) { }

  async ngOnInit(): Promise<void> {
    this.organizations = await this.dataProvider.findAll<Organization>('organizations')
  }

}
