import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  getToken() :HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPurchase(): Observable<any> {
    const headers = this.getToken();
    return this.http.get<Purchase[]>(`${environment.apiUrl}/v1/compra`, { headers: headers });
  }

  addPurchase(value: string): Observable<any> {
    const headers = this.getToken();
    return this.http.post<Purchase>(`${environment.apiUrl}/v1/compra`,value, { headers: headers });
  }

  deletePurchase(id:number) {
    const headers = this.getToken();
    return this.http.delete<void>(`${environment.apiUrl}/v1/compra/${id}`, { headers: headers});
  }

  putPurchase(value: Purchase): Observable<Purchase>{   
    const headers = this.getToken();    
    return this.http.put<Purchase>(`${environment.apiUrl}/v1/compra/${value.id}`, value, { headers: headers });
  }
}
