import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../models/category.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.css']
})
export class CategoriaPageComponent implements OnInit {

  mrkBuy: boolean = true;
  categoria: Category;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Category[] = [];

  displayedColumns: string[] = ['id', 'name', 'acoes'];
  dataSource: MatTableDataSource<Category>

  constructor(private categoryService: CategoryService) {
    const products = categoryService.getCategorys();
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

}
