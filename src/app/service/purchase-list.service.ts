import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PurchaseList } from '../models/purchase-list.model';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseListService {

  constructor(private http: HttpClient) { }

  getToken() :HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPurchaseList(): Observable<any> {
    const headers = this.getToken();
    return this.http.get<PurchaseList[]>(`${environment.apiUrl}/v1/listacompra`, { headers: headers });
  }

  getPurchaseListById(id:number): Observable<PurchaseList> {
    const headers = this.getToken();
    return this.http.get<PurchaseList>(`${environment.apiUrl}/v1/listacompra/${id}`, { headers: headers });
  }

  addPurchaseList(value: string): Observable<any> {
    const headers = this.getToken();
    return this.http.post<PurchaseList>(`${environment.apiUrl}/v1/listacompra`,value, { headers: headers });
  }

  deletePurchaseList(id:number){
    const headers = this.getToken();
    return this.http.delete<void>(`${environment.apiUrl}/v1/listacompra/${id}`, { headers: headers});
  }

  putPurchaseList(item: PurchaseList){
    const headers = this.getToken();
    return this.http.put<void>(`${environment.apiUrl}/v1/listacompra/${item.id}`,item, { headers: headers})
  }
}
