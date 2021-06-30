import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  redirect(url: string) {
    window.location.href = `http://localhost:3000/auth/?redirectUrl=${url}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/map');
  }
}
