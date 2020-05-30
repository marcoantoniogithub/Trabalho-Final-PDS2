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

  // getProduct(id: number) {
  //   return this.getProducts().find(item => item._id === +id);
  // }

  // updateProduct(item) {
  //   let prod = this.getProduct(item._id);
  //   this.items[prod._id - 1] = item;
  // }
}
