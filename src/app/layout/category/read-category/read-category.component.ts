import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from 'src/app/models/category.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-read-category',
  templateUrl: './read-category.component.html',
  styleUrls: ['./read-category.component.css']
})
export class ReadCategoryComponent implements OnInit {

  mrkBuy: boolean = true;
  categorias: Category[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Category[] = [];

  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource: MatTableDataSource<Category>

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService
  ) {
    this.getCategories();
  }

  ngOnInit(): void {

  }

  getCategories() {
    this.loaderService.show();
    this.categoryService.getCategories().subscribe((data: Category[]) => {      
      this.categorias = data;
      this.dataSource = new MatTableDataSource(this.categorias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaderService.hide();
    },
      (error) => {
        this.loaderService.hide();
        console.log(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCategory(value: number) {
    this.categoryService.deleteCategory(value).subscribe(
      data => {
        this.getCategories();        
      },
      (error) => {
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
        console.log(error);
      }
    )
  }

  save(value: number) {
    this.router.navigate(['/categoria/cadastrar/' + value]);
  } 
}
