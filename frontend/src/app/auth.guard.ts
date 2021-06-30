import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    const currentUser = this.authService.currentUserValue;
    console.log(this.router.url)
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/404'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}