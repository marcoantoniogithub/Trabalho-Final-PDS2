import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
             ) { }

  login(valores: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/v1/usuario/login`, valores)

  }

  logado(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }

  sair() {
    sessionStorage.removeItem('token');
  }

}
