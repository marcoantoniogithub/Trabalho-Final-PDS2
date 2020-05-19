import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../service/product.service';
import { Product } from 'src/models/product';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  mrkBuy: boolean = true;
  product: Product;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'item', 'comprado', 'quantidade', 'valor', 'total', 'acoes'];
  dataSource: MatTableDataSource<Product>

  constructor(private productService: ProductService) {
    const products = productService.getProducts();  //Array.from({length: 10}, (_, k) => this.createNewProduct(k + 1));
    this.dataSource = new MatTableDataSource(products);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getValueTotalComprar(): number {

    var totalComprar = this.productService.getProducts()
      .filter(elem => !elem.comprado)
      .reduce(function (acc, elem) {
        return acc + elem.valor;
      }, 0);

    return totalComprar;
  }

  getValueTotalComprado() {
    var totalComprado = this.productService.getProducts()
      .filter(elem => elem.comprado)
      .reduce(function (acc, elem) {
        return acc + elem.valor;
      }, 0);

    return totalComprado;
  }

  markedBuyed(item) {
    item.comprado = item.comprado ? false : true;
    this.product = this.productService.getProduct(item.id);
    this.product.comprado = item.comprado;
    this.productService.updateProduct(this.product);

    this.getValueTotalComprar();

    //this.dataSource[this.product.id - 1] = this.product;
    //console.log(this.productService.getProducts());
    //this.getValueTotalComprar();
    //this.getValueTotalComprado();

  }
}
