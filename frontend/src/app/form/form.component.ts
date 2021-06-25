import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Organization} from '../model/organization.model';
import {DataProviderService} from '../data-provider.service';
import {Person} from '../model/person.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  organizations: Organization[] = [];

  constructor(private dataservice: DataProviderService, private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      '@id': [],
      'pair:firstName': [, Validators.required],
      'pair:lastName': [, Validators.required],
      'pair:affiliatedBy': [, ]
    })
    this.organizations = await this.dataservice.findAll<Organization>('organizations');

  }

  async submit(): Promise<void> {
    await this.dataservice.create<Person>('persons', this.form.value, Person);
  }
}
