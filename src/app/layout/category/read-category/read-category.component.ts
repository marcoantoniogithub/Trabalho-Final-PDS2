import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
  ) {   
      this.listarCategorias();       
  }


  listarCategorias() {
       this.categoryService.getCategorys().subscribe((data: Category[]) => { 
       this.categorias = data;        
       this.dataSource = new MatTableDataSource(this.categorias);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    },
    (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {    
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(value:number){
    this.categoryService.deleteCategory(value).subscribe(
      data => {
        window.location.reload();
      },
      (error) => {
        this.snackBar.open('Ops algo deu errado!','', { duration: 2000 });
        console.log(error);
      }
    )
  }

  put(value:number){
    this.router.navigate(['/categoria/cadastrar', {id: value}]);
  }
}
