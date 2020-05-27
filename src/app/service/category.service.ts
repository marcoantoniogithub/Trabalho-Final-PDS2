import { Injectable } from '@angular/core';

import { Category } from '../models/category.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  constructor(private http: HttpClient) {  }

  getCategorys(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(`${environment.apiUrl}/v1/categoria`, { headers: headers });
     
  }

  /*
  getCategory(id: number) {
    return this.getCategorys().find(item => item._id === +id);
  }

  updateCategory(item) {
    let prod = this.getCategory(item._id);
    this.items[prod._id - 1] = item;
  }

  seed() {
    this.items.push(new Category(1, 'Frios e Laticínios',));
    this.items.push(new Category(2, 'Carne e Frios'));
    this.items.push(new Category(3, 'Açougue'));
  }  */
}
