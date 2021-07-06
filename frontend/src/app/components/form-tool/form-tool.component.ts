import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-tool',
  templateUrl: './form-tool.component.html',
  styleUrls: ['./form-tool.component.scss']
})
export class FormToolComponent implements OnInit {

  form!: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
