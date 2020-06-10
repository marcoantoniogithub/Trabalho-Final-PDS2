import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias, _filter } from '../../core/register-page/register-page.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/Product.model';
import { StoreroomService } from 'src/app/service/storeroom.service';
import { Storeroom } from 'src/app/models/storeroom.model';

@Component({
  selector: 'app-register-purchase-item',
  templateUrl: './register-purchase-item.component.html',
  styleUrls: ['./register-purchase-item.component.css']
})
export class RegisterPurchaseItemComponent implements OnInit {
  
  form: FormGroup;
  categorias: Category[] = [];
  despensas: Storeroom[] = [];
  id: number;
  title: string;

  constructor(
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private categoryService:CategoryService,
    private productService: ProductService,
    private storeroomService: StoreroomService,
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
      despensaId: [
        ''
      ],
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
    );

    this.storeroomService.getStorerooms().subscribe(
      (data) =>{
        this.despensas = data;
      },
      (error) =>{
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
      }
    )

    this.id = +this.activeroute.snapshot.paramMap.get('id');

    if(this.id != 0){
      this.title = 'Alterar Item de Compra';
      this.productService.getProductId(this.id).subscribe(
        (data) =>{
          this.setAllValuesForm(data);
        },
        (error) =>{
          console.log(error);
        }
      );
    } else {
      this.title = 'Novo Item de Compra';
    }
  }

  setAllValuesForm(produto: Product){
    this.form.controls['nome'].setValue(produto.nome);
    this.form.controls['categoriaId'].setValue(produto.categoriaId);
    this.form.controls['despensaId'].setValue(produto.despensaId);
  }

  submit(){
    console.log(this.form.value);
    this.productService.addProduct(this.form.value).subscribe(
      (data) => {
        this.snackBar.open('Cadastrado!','', { duration: 2000 });
        this.router.navigate(['/item']);
      },
      (error) => {
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
      }
    );
  }

  update(){
    let product = this.form.getRawValue() as Product;    
    product.id =  this.id;
    this.productService.updateProduct(product).subscribe(
      (data) => {
        this.router.navigate(['/item']);
      },
      (error) => {
        this.snackBar.open('Ops, algo deu errado!','', { duration: 2000 });
      },
    )
  }
}
