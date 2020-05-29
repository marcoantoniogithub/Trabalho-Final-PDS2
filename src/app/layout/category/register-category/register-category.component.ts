import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.css']
})
export class RegisterCategoryComponent implements OnInit {

  public form: FormGroup; 
  public title:string;
  public category: Category;
  public id:number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {

    this.form = fb.group({
      nome:[
        '', 
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if(this.id != 0){
      this.title = 'Alteração de Categoria';
      this.categoryService.getCategory(this.id).subscribe(
        (category: Category) => {
          this.category = category;
          this.form.controls['nome'].setValue(this.category.nome);
        },
        (error) => {
          this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
        }
      );
    } else {
      this.title = 'Cadastro de Categoria';
    }
  }

  submit(){
    this.categoryService.postCategory(this.form.value).subscribe(
      (data) => {
        this.router.navigate(['/categoria']);
      },
      (error) => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

  update(){
    debugger;
    const value:any = JSON.parse(`{"id": ${this.category.id}, "nome": "${this.form.controls['nome'].value}"}`);
    console.log(value);
    this.categoryService.putCategory(this.category.id,value).subscribe(
      (data) => {
        this.router.navigate(['/categoria']);
      },
      (error) => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

}
