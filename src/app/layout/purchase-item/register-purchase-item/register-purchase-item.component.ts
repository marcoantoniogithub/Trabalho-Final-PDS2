import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias, _filter } from '../../core/register-page/register-page.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-register-purchase-item',
  templateUrl: './register-purchase-item.component.html',
  styleUrls: ['./register-purchase-item.component.css']
})
export class RegisterPurchaseItemComponent implements OnInit {
  
  form: FormGroup;
  categorias:Categorias[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private categoryService:CategoryService,
    private productService: ProductService,
  ) {
    this.form = fb.group({
      item: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      categoria: [
        ''
      ],
      quantidade: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      valor: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      checkBox: [
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
    this.productService.addProduct(this.form.value);
  }
}
