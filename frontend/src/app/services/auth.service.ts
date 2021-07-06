import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../model/user.model';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<User | null>;

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(currentUser));
    }else{
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User | null {
    return (this.currentUserSubject) ? this.currentUserSubject.value : null;
  }

  login(token: string) {
      const jsonPayload = jwt_decode(token);
      const u =  new User();
      u.assignData(jsonPayload as User);
      if(environment.adminmail.includes(u.email)){
        localStorage.setItem('currentUser', JSON.stringify(u));
        console.log('USER->', u)
        this.currentUserSubject.next(u);
      }else{
        this.logout()
      }
  }
  logout() {
    console.log('LOGOUT')
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
