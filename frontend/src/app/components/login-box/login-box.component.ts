import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  currentUrl: string =  ''

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public isLogged(): boolean{
    return !!this.authService.currentUserValue
  }

  redirectLogin() {
    this.currentUrl = this.router.url
    console.log(`${environment.serverUrl}auth/?redirectUrl=${encodeURIComponent(environment.serverUrl + '?route='+ this.currentUrl)}`);
      window.location.href = `${environment.serverUrl}auth/?redirectUrl=${encodeURIComponent(environment.serverUrl + '?route='+ this.currentUrl)}`;
  }

  logout() {
    this.authService.logout();
  }


}
