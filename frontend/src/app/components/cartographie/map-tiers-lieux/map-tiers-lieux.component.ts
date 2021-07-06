import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNode} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';

import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-map-tiers-lieux',
  templateUrl: './map-tiers-lieux.component.html',
  styleUrls: ['./map-tiers-lieux.component.scss']
})
export class MapTiersLieuxComponent implements OnInit {

  constructor() {
  }
  ngOnInit(){

  }
}
