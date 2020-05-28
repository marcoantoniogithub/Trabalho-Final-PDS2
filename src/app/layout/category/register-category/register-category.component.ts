import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.css']
})
export class RegisterCategoryComponent implements OnInit {

  public form: FormGroup;
  public nomeUpdate:string = this.route.snapshot.paramMap.get('nome');
  public idUpdate:string = this.route.snapshot.paramMap.get('id');
  public title:string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      nome:[
        this.nomeUpdate,
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
    })
  }

  ngOnInit(): void {
    this.nomeUpdate != ''? this.title = 'Alteração de Categoria' : this.title = 'Cadastro de Categoria';
  }

  submit(){
    this.categoryService.postCategorys(this.form.value).subscribe(
      data => {
        this.router.navigate(['/categoria']);
      },
      error => {
        console.log(error);
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

  update(){
    let value:any = JSON.parse(`{"id": ${this.idUpdate}, "nome": "${this.form.controls['nome'].value}"}`);
    this.categoryService.putCategorys(value).subscribe(
      data => {
        this.router.navigate(['/categoria']);
      },
      error => {
        console.log(error);
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

}
