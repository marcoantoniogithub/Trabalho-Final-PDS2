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
  categorias: Category[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Category[] = [];

  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource: MatTableDataSource<Category>

  constructor(private categoryService: CategoryService) {   
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

}
