import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mainwrapper',
  templateUrl: './mainwrapper.component.html',
  styleUrls: ['./mainwrapper.component.scss']
})
export class MainwrapperComponent implements OnInit {

  public isIndex = false;

  constructor(public route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      m => console.log(m)
    )
  }

}
