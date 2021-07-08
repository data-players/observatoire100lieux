import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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

  redirect(url: string) {
    this.currentUrl = this.router.url
    window.location.href = `http://localhost:3000/auth/?redirectUrl=${encodeURIComponent(url+'?route='+this.currentUrl)}`;
  }

  logout() {
    this.authService.logout();
  }


}
