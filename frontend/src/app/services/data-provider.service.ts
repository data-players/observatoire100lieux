import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import _ from 'lodash';
import {AuthService} from './auth.service';
import {User} from '../model/user.model';

export enum ActionType {
  NEW ='NEW',
  UPDATE='UPDATE',
  DELETE='DELETE'
}

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
  async add<T extends object>(endpoint: string, body: T, type: string, slug?:string): Promise<T | null> {
    if(this.authService.currentUserValue){
      return this.createReq(endpoint, body, type)
    }else{
      this.addFlag(body, ActionType.NEW);
      return this.createReq(`pending${endpoint}`, body, type, slug)
    }
  }

  async update<T extends object>(endpoint: string, body: T, id: string, type: string): Promise<T> {
    let existInPending = false
    if(this.authService.currentUserValue){
      return this.updateReq(endpoint, body, id, type, id)
    }else{
      this.addFlag(body, ActionType.UPDATE);
      return this.findOne(`pending${endpoint}`, id).then( res=>{return this.updateReq(`pending${endpoint}`, body, type, id)},
                                                                  rej=>{return this.createReq(`pending${endpoint}`, body, type, id)});}
  }


  async delete<T extends object>(endpoint: string, body: T, id: string, type: string): Promise<T> {
    if(this.authService.currentUserValue){
      return this.deleteReq(endpoint, id)
    }else{
      this.addFlag(body, ActionType.DELETE);
      return this.createReq(`pending${endpoint}`, body, type, id)
    }
  }


  async createReq<T>(endpoint: string, body: T, type: string, slug?:string): Promise<T> {
    const payload = Object.assign({}, body, {
      '@context': 'http://localhost:3000/context.json',
      '@type': 'pair:' + type
    })
    let httpHeaders: HttpHeaders = new HttpHeaders();
    console.log('SLUG',slug)
    if(slug)
      httpHeaders = httpHeaders.append('Slug', slug)
    console.log('BODY', body)
    return this.http.post<any>(`http://localhost:3000/${endpoint}`, payload,{headers: httpHeaders}).pipe(
    ).toPromise();
  }

  async deleteReq<T>(endpoint: string, id:string): Promise<T> {
    return this.http.delete<any>(`http://localhost:3000/${endpoint}/${id}`).pipe(
    ).toPromise();
  }
  private async updateReq<T>(endpoint: string, body: T, id: string, type: string, slug?:string): Promise<T> {
    const payload = Object.assign({}, body, {
      '@context': 'http://localhost:3000/context.json',
      '@type': 'pair:' + type
    })
    let httpHeaders: HttpHeaders = new HttpHeaders();
    if(slug)
      httpHeaders.set('Slug', slug)

    return this.http.put<any>(`http://localhost:3000/${endpoint}/${id}`, payload, {headers: httpHeaders}).pipe(
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
      if (typeof obj[b] !== 'string' && typeof obj[b] !== 'number' && typeof obj[b] !== 'boolean') {
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

  addFlag<T extends object>(obj: T, flag: ActionType){
    _.set(obj, '100lieux:flag', flag)
    return obj
  }

  private changeAsArray(w: any) {
      const keys = Object.keys(w)
      for (let prop of this.asAnArray){
        const getObj = (_.get(w, prop.reduce((a,b) => a+'.'+b)))
        _.set(w, prop.reduce((a,b) => a+'.'+b), [].concat(getObj))
      }
      return w
  }
  async postFile<T>(endpoint: string, obj: any): Promise<any> {
    return this.http.post<any>(`http://localhost:3000/${endpoint}`, obj, {observe: 'response'}).pipe(
    ).toPromise();
  }

}