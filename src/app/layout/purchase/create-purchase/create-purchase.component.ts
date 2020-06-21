import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { Storeroom } from 'src/app/models/storeroom.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { StoreroomService } from 'src/app/service/storeroom.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/service/loader.service';
import { Router } from '@angular/router';
import { nextTick } from 'process';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.css']
})
export class CreatePurchaseComponent implements OnInit {

  mrkBuy: boolean = true;
  products: Product[] = [];
  product: Product;
  categorias: Category[] = [];
  storeroom: Storeroom[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Product[] = [];

  displayedColumns: string[] = ['nome', 'categoria', 'despensa', 'quantidade', 'acoes'];
  dataSource: MatTableDataSource<Product>

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private storeroomService: StoreroomService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private router:Router,
    private _formBuilder: FormBuilder,
  ) {
  }

  async ngOnInit(): Promise<void> {

    this.firstFormGroup = this._formBuilder.group({
      nome: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.products = [];
    this.categorias = [];
    await this.getStoreRoom();
    await this.getCategories();
    await this.getProducts(); 
  }

  async getProducts() {
    this.loaderService.show();
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products.push(...products)
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loaderService.hide();
        this.products.forEach(element => {
          element.comprar = 0;
        });
      },
      (error) => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  async getCategories() {
    this.categoryService.getCategories().subscribe(
      (categorias: Category[]) => {
        this.categorias.push(...categorias);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getStoreRoom() {
    this.storeroomService.getStorerooms().subscribe(
      (data: Storeroom[]) => {
        this.storeroom.push(...data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearProduct(nome: string) {
    this.products.forEach(element => {
      if(element.nome == nome) 
        element.comprar = 0; 
    });
  }


  getCategoriaNome(id: number): string {
    return this.categorias.find(value => value.id == id).nome;
  }

  getStoreroomNome(id: number): string {
    return this.storeroom.find(value => value.id == id).title;
  }

  addProduct(nome: string){
    this.products.forEach(element => {
      if(element.nome == nome) 
        element.comprar += 1; 
    });
  }

}
