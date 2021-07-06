import {Component, OnInit} from '@angular/core';
import {DataProviderService} from './services/data-provider.service';
import {Person} from './model/person.model';
import {AuthService} from './services/auth.service';

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
