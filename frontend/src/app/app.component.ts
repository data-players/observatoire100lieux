import {Component, OnInit} from '@angular/core';
import {DataProviderService} from './data-provider.service';
import {Person} from './model/person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  persons : Person[] = [];

  constructor(private dataservice: DataProviderService) {
  }

  async ngOnInit(): Promise<void>  {
    //this.persons = await this.dataservice.findAll<Person>('persons');

  }



}
