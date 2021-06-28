import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private headers = new HttpHeaders().append('Accept', 'application/ld+json')

  constructor(private http: HttpClient) { }

  async findAll<T>(endpoint: string): Promise<T[]> {
    return this.http.get<any>(`http://localhost:3000/${endpoint}`,  {headers: this.headers, responseType: 'json'}).pipe(
      map(v => v['ldp:contains'].map((w: any) => {
        w = this.removePrefixes(w);
        return Object.assign({id: w['@id']}, w as T)
      }) as T[])
    ).toPromise();
  }

  async create<T>(endpoint: string, body: T, type: string) : Promise<T> {
    const payload = Object.assign({}, body, {
      '@context': 'http://localhost:3000/context.json',
      '@type': 'pair:'+type
    })
    return this.http.post<any>(`http://localhost:3000/${endpoint}`, payload).pipe(
      map(v => v['ldp:contains'].map((w: any) => {
        w.id = w['@id']
        return Object.assign({id: w['@id']}, w as T)
      }) as T)
    ).toPromise();
  }

  private removePrefixes(obj: any): object{
    obj = Object.keys(obj).reduce((a, b) => {
      if(b==='@id') {obj['id'] = obj['@id']};
        (a as any)[
            b.substring(
              b.indexOf(':')+1,
              b.length
            )]  = obj[b];
      if(typeof obj[b] !== 'string') {
        obj[b] = this.removePrefixes(obj[b])
      }
      return obj;
    }, {});
    return obj
  }
  /*


  async getOne(resourceId: any, params: any) {
    if (!resources[resourceId]) {
    Error(`Resource ${resourceId} is not mapped in resources file`);
  }
const dataModel = resources[resourceId];

let { json } = await httpClient(params.id);
json.id = json.id || json['@id'];
  // TODO compact only if remote context is different from local context
const compactJson = await jsonld.compact(json, jsonContext || buildJsonContext(ontologies));
  // transform single value into array concidering forceArray predicates
if (dataModel.forceArray) {
for (const forceArrayItem of dataModel.forceArray) {
if (compactJson[forceArrayItem] && !Array.isArray(compactJson[forceArrayItem])) {
compactJson[forceArrayItem] = [compactJson[forceArrayItem]];
}
}
}
return { data: compactJson };
},*/
}
