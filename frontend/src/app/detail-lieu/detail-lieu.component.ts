import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from 'xng-breadcrumb';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-lieu',
  templateUrl: './detail-lieu.component.html',
  styleUrls: ['./detail-lieu.component.scss']
})
export class DetailLieuComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( p => {
      this.breadcrumbService.set('/map/:name', p['name']);
    })
  }

}
