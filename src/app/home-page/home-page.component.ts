import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../service/product.service';
import { Product } from '../models/Product.model';


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

  ELEMENT_DATA: Product[] = [];

  displayedColumns: string[] = ['item','quantidade', 'valor', 'acoes'];
  dataSource: MatTableDataSource<Product>

  constructor(private productService: ProductService) {
    const products = productService.getProducts();
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

  getValueTotalComprar() {
    var totalComprar = this.productService.getProducts()
      .filter(elem => !elem._comprado)
      .reduce(function (acc, elem) {
        return acc + (elem._valor * elem._quantidade);
      }, 0);

      return totalComprar;
  }

  getValueTotalComprado() {
    var totalComprado = this.productService.getProducts()
      .filter(elem => elem._comprado)
      .reduce(function (acc, elem) {
        return acc + (elem._valor * elem._quantidade);
      }, 0);

    return totalComprado;
  }

  markAsBuyed(item) {
    item._comprado = item._comprado ? false : true;
    this.product = this.productService.getProduct(item._id);
    this.product._comprado = item._comprado;
    this.productService.updateProduct(this.product);
  }
 
}
