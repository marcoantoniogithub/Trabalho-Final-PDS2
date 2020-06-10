import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { Category } from 'src/app/models/category.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/service/loader.service';
import { Router } from '@angular/router';
import { StoreroomService } from 'src/app/service/storeroom.service';
import { Storeroom } from 'src/app/models/storeroom.model';

@Component({
  selector: 'app-read-purchase-item',
  templateUrl: './read-purchase-item.component.html',
  styleUrls: ['./read-purchase-item.component.css']
})
export class ReadPurchaseItemComponent implements OnInit {

  mrkBuy: boolean = true;
  products: Product[] = [];
  product: Product;
  categorias: Category[] = [];
  storeroom: Storeroom[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Product[] = [];

  displayedColumns: string[] = ['nome', 'categoria', 'despensa', 'acoes'];
  dataSource: MatTableDataSource<Product>

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private storeroomService: StoreroomService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private router:Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
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

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
      }
    )
  }

  editProduct(id:number) {
    this.router.navigate(['/item/cadastrar/' + id]);
  }

  getCategoriaNome(id: number): string {
    return this.categorias.find(value => value.id == id).nome;
  }

  getStoreroomNome(id: number): string {
    return this.storeroom.find(value => value.id == id).title;
  }
}
