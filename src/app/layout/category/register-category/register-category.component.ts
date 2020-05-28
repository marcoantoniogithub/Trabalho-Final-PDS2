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
  category: Category;


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      nome:['', 
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
    })
  }

  ngOnInit(): void {
    //this.nomeUpdate != ''? this.title = 'Alteração de Categoria' : this.title = 'Cadastro de Categoria';
  }

  submit(){
    this.categoryService.postCategory(this.form.value).subscribe(
      data => {
        this.router.navigate(['/categoria']);
      },
      error => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

  update(){
    const id = this.route.snapshot.paramMap.get('id');    
    
    this.categoryService.getCategory(+id).subscribe((category: Category) => {
          this.category = category;
       });   


    let value:any = JSON.parse(`{"id": ${id}, "nome": "${this.form.controls['nome'].value}"}`);
    this.categoryService.putCategory(value).subscribe(
      data => {
        this.router.navigate(['/categoria']);
      },
      error => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }

}
