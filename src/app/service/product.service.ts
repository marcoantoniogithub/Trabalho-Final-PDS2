import { Injectable } from '@angular/core';

import { Product } from '../models/Product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
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
    return this.http.get<Category[]>(`${environment.apiUrl}/v1/itemcompra`, { headers: headers });
  }

  // getProduct(id: number) {
  //   return this.getProducts().find(item => item._id === +id);
  // }

  // updateProduct(item) {
  //   let prod = this.getProduct(item._id);
  //   this.items[prod._id - 1] = item;
  // }
}
