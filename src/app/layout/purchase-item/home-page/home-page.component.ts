import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  mrkBuy: boolean = true;
  products: Product[] = [];
  product: Product;
  categorias: Category[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Product[] = [];

  displayedColumns: string[] = ['nome', 'quantidade', 'valor', 'categoria', 'total', 'acoes'];
  dataSource: MatTableDataSource<Product>

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    await this.getProducts();
  }

  async getProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products.push(...products)
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this.getProducts();
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
      }
    )

  }

  getCategoriaNome(id: number): string {
    return this.categorias.find(value => value.id == id).nome;
  }


  getValueTotalComprar() {
    var totalComprar = this.products
      .filter(elem => !elem.comprado)
      .reduce(function (acc, elem) {
        return acc + (elem.valor * elem.quantidade);
      }, 0);

    return totalComprar;
  }

  getValueTotalComprado() {
     var totalComprado = this.products
       .filter(elem => elem.comprado)
       .reduce(function (acc, elem) {
         return acc + (elem.valor * elem.quantidade);
       }, 0);

    return totalComprado;    
  }

  markAsBuyed(item) {
    item.comprado = item.comprado ? false : true;
    this.productService.updateProduct(item);
  }

}
