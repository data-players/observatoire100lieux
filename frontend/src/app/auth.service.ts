import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {User} from './model/user.model';
import jwt_decode from 'jwt-decode';
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
      localStorage.setItem('currentUser', JSON.stringify(u));
      console.log('USER->', u)
      this.currentUserSubject.next(u);
      return u;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
