import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from 'xng-breadcrumb';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private bd: BreadcrumbService) { }

  ngOnInit(): void {
    this.bd.set('', {skip:false})
  }

}
