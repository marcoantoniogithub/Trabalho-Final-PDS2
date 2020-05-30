import { Injectable } from '@angular/core';

import { Storeroom } from '../models/storeroom.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreroomService {

 
  constructor(private http: HttpClient) {  }

  getToken() :HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getStorerooms(): Observable<any> {
    const headers = this.getToken();
    return this.http.get<Storeroom[]>(`${environment.apiUrl}/v1/storeroom`, { headers: headers });
     
  }

  getStoreroom(id: number) {
    const headers = this.getToken();
     return this.http.get<Storeroom>(`${environment.apiUrl}/v1/storeroom/${id}`, { headers: headers });
  }

  addStoreroom(value:string): Observable<any>{
    const headers = this.getToken();
    return this.http.post(`${environment.apiUrl}/v1/storeroom`,value, { headers: headers });
  }

  deleteStoreroom(id:number){
    const headers = this.getToken();
    return this.http.delete<void>(`${environment.apiUrl}/v1/storeroom/${id}`, { headers: headers});
  }

  updateStoreroom(storeroom: Storeroom): Observable<any>{
    const headers = this.getToken();
    return this.http.put<Storeroom>(`${environment.apiUrl}/v1/storeroom/}`,storeroom, { headers: headers });
  }
}
