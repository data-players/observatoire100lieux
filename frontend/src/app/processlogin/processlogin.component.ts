import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-processlogin',
  template: '',
  styles: ['']
})
export class ProcessloginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const url = new URL(window.location.toString());
    if (url.searchParams.has('token')) {
      const token = url.searchParams.get('token');
      if(token)
      this.authService.login(token)
      //localStorage.setItem('token', token ? token : '' );
      url.searchParams.delete('token');

      window.location.href = url.toString();
    }
  }

}
