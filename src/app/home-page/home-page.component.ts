import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  item: String;
  categoria: String;
  comprado: Boolean;
  quantidade: number;
  valor: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ELEMENT_DATA: Product[] = [

  ];

  displayedColumns: string[] = ['item', 'categoria', 'comprado', 'quantidade', 'valor', 'total', 'acoes'];
  dataSource: MatTableDataSource<Product>

  constructor() { 
    const users = Array.from({length: 100}, (_, k) => this.createNewProduct(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createNewProduct(id: number): Product {
    return {item: 'Leite', categoria: 'Frios e Laticínios', comprado: false, quantidade: 3, valor: 3.33};
  }

  getValueTotalComprar() {
    return 100.00;
  }

  getValueTotalComprado(){
    return 20.00;
  }

}
