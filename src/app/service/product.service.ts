import { Injectable } from '@angular/core';

import { Product } from '../models/Product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  items: Product[] = [];
  constructor(private http: HttpClient) { }

  getToken() :HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProducts(): Observable<any> {
    const headers = this.getToken();
    return this.http.get<Product[]>(`${environment.apiUrl}/v1/itemcompra`, { headers: headers });
  }

  deleteProduct(id:number){
    const headers = this.getToken();
    return this.http.delete<void>(`${environment.apiUrl}/v1/itemcompra/${id}`, { headers: headers});
  } 

   updateProduct(item: Product): Observable<Product> {
    const headers = this.getToken();
    return this.http.post<Product>(`${environment.apiUrl}/v1/itemcompra`, item, { headers: headers });     
   }

   addProduct(value:string): Observable<any>{
    const headers = this.getToken();
    return this.http.post(`${environment.apiUrl}/v1/itemcompra`,value, { headers: headers });
  }
}
