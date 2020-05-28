import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  

  constructor(
    private fb: FormBuilder,    
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {
    this.form = fb.group({
      nome: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      senha: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {}

  submit() {
     this.loginService.login(this.form.value)
     .subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.snackBar.open('Usuário ou senha inválidos','', { duration: 2000 });
      }
    );
  }

  

}
