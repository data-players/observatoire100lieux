import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddresseDataGouvService {

  constructor(private http: HttpClient) {
  }
  async findAddresse(address: string): Promise<{ [key: string] : any}> {
    return this.http.get<any>(`${environment.adresseUrl}?q=${address}`, {  responseType: 'json'})
    .toPromise();
  }
}
