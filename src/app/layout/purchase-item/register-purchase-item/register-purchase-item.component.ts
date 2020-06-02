import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias, _filter } from '../../core/register-page/register-page.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-register-purchase-item',
  templateUrl: './register-purchase-item.component.html',
  styleUrls: ['./register-purchase-item.component.css']
})
export class RegisterPurchaseItemComponent implements OnInit {
  
  form: FormGroup;
  categorias:Category[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private categoryService:CategoryService,
    private productService: ProductService,
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
      categoriaId: [
        ''
      ],
      quantidade: [
        '',
        [
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      valor: [
        '',
        [
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      comprado: [
        false
      ]
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data) =>{
        this.categorias = data;
      },
      (error) =>{
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
      }
    )
  }

  submit(){
    console.log(this.form.value);
    this.productService.addProduct(this.form.value).subscribe(
      (data) => {
        this.snackBar.open('Cadastrado!','', { duration: 2000 });
        this.router.navigate(['/home']);
      },
      (error) => {
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
      }
    );
  }
}
