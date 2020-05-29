import { Injectable } from '@angular/core';

import { Category } from '../models/category.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  constructor(private http: HttpClient) {  }

  getToken() :HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCategories(): Observable<any> {
    const headers = this.getToken();
    return this.http.get<Category[]>(`${environment.apiUrl}/v1/categoria`, { headers: headers });
     
  }

  getCategory(id: number) {
    const headers = this.getToken();
     return this.http.get<Category>(`${environment.apiUrl}/v1/categoria/${id}`, { headers: headers });
  }

  addCategory(value:string): Observable<any>{
    const headers = this.getToken();
    return this.http.post(`${environment.apiUrl}/v1/categoria`,value, { headers: headers });
  }

  deleteCategory(id:number){
    const headers = this.getToken();
    return this.http.delete<void>(`${environment.apiUrl}/v1/categoria/${id}`, { headers: headers});
  }

  updateCategory(category: Category): Observable<any>{
    const headers = this.getToken();
    return this.http.put<Category>(`${environment.apiUrl}/v1/categoria/${category.id}`,category, { headers: headers });
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
