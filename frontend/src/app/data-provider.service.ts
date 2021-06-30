import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import _ from 'lodash';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private headers = new HttpHeaders().append('Accept', 'application/ld+json')

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private asAnArray: string[][] = [['hasDomain'], ['hasBranch'], ['hasLocation', 'hasDigitalPlace']];

  async findAll<T>(endpoint: string): Promise<T[]> {
    return this.http.get<any>(`http://localhost:3000/${endpoint}`, {headers: this.headers, responseType: 'json'}).pipe(
      map(v => v['ldp:contains'].map((w: any) => {
        console.log('id', w['id'])
        w = this.removePrefixes(w);
        w = this.changeAsArray(w);
        w['id'] = w['@id'];
        return Object.assign({id: w['@id']}, w as T)
      }) as T[])
    ).toPromise();
  }

  async findOne<T>(endpoint: string, id: string): Promise<T> {
    return this.http.get<any>(`http://localhost:3000/${endpoint}/${id}`, {
      headers: this.headers,
      responseType: 'json'
    }).pipe(
      map(v => {
        v = this.removePrefixes(v);
        v = this.changeAsArray(v);
        v['id'] = v['@id'];
        return Object.assign({id: v['@id']}, v as T)
      })
    ).toPromise();
  }
  /*async add<T>(endpoint: string, body: T, type: string): Promise<T> {

  }*/

  async create<T>(endpoint: string, body: T, type: string): Promise<T> {
    const payload = Object.assign({}, body, {
      '@context': 'http://localhost:3000/context.json',
      '@type': 'pair:' + type
    })
    return this.http.post<any>(`http://localhost:3000/${endpoint}`, payload).pipe(
    ).toPromise();
  }

  async update<T>(endpoint: string, body: T, id: string, type: string): Promise<T> {
    const payload = Object.assign({}, body, {
      '@context': 'http://localhost:3000/context.json',
      '@type': 'pair:' + type
    })
    return this.http.put<any>(`http://localhost:3000/${endpoint}/${id}`, payload).pipe(
    ).toPromise();
  }


  private removePrefixes(obj: any): object {
    obj = Object.keys(obj).reduce((a, b) => {
      if (b === '@id') {
        obj['id'] = obj['@id']
      };
      (a as any)[
        b.substring(
          b.indexOf(':') + 1,
          b.length
        )] = obj[b];
      if (typeof obj[b] !== 'string') {
        obj[b] = this.removePrefixes(obj[b])
      }
      return obj;
    }, {});
    return obj
  }

  extractUrlHash(url: string): string {
    const strings = url.split('/');
    return strings[strings.length - 1]
  }

  private changeAsArray(w: any) {
      const keys = Object.keys(w)
      for (let prop of this.asAnArray){
        const getObj = (_.get(w, prop.reduce((a,b) => a+'.'+b)))
        _.set(w, prop.reduce((a,b) => a+'.'+b), [].concat(getObj))
      }
      return w
  }

}
