import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-lieu',
  templateUrl: './form-lieu.component.html',
  styleUrls: ['./form-lieu.component.scss']
})
export class FormLieuComponent implements OnInit {

  form!: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'pair:id': [],
      'pair:label': [],
      'pair:description': [],
      'pair:homepage': [],
      'pair:comment': this.fb.array([
        this.fb.control([]), // Horaires
        this.fb.control([]), // Modalité d'accueil
      ]),
      'pair:phone': [],
      'pair:email': [],
      'pair:hasLocation':
        this.fb.group({
          'pair:hasPostalAddress': this.fb.group({
            'pair:label': [],
            'pair:addressCountry': [],
            'pair:addressZipcode': [],
            'pair:addressStreet': [],
            'pair:latitude': [],
            'pair:longitude': [],
          }),
          'pair:hasDigitalPlace':this.fb.array(
          [
            this.fb.group(
              {
                'pair:label': [],
                'pair:page': []
              },
            )
          ])
        }),
    })
  }

  get comments(){
    return this.form.controls['pair:comment']
  }
  get digitalPlaces(): FormArray{
    return (this.form.controls['pair:hasLocation'] as FormGroup).controls['pair:hasDigitalPlace'] as FormArray
  }

  submit(){
    const values = this.form.value;
    this.encapsulateIn(values['hasLocation']
  }

  private definePredicat(json: any, type: string) {

  }
}
