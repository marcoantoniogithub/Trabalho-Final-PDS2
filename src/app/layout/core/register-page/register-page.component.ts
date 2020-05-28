import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

export interface Categorias {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      nome: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
      senha: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.http.post(`${environment.apiUrl}/v1/usuario`, this.form.value).subscribe(
      (data) => {
        this.snackBar.open('Cadastrado!','', { duration: 2000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      }
    );
  }

}
