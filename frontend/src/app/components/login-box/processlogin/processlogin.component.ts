import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-processlogin',
  template: '',
  styles: ['']
})
export class ProcessloginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const url = new URL(window.location.toString());
    console.log(url)
    if (url.searchParams.has('token')) {
      const token = url.searchParams.get('token');
      if(token)
      this.authService.login(token)
      url.searchParams.delete('token');
      const route = url.searchParams.get('route');
      if( route){
        window.location.href =  route;
      }else{
        window.location.href =  'url';
      }
    }
  }

}
