import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Storeroom } from 'src/app/models/storeroom.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreroomService } from 'src/app/service/storeroom.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-read-storeroom',
  templateUrl: './read-storeroom.component.html',
  styleUrls: ['./read-storeroom.component.css']
})
export class ReadStoreroomComponent implements OnInit {

  mrkBuy: boolean = true;
  storerooms: Storeroom[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Storeroom[] = [];

  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource: MatTableDataSource<Storeroom>

  constructor(
    private storeroomService: StoreroomService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
  ) {
    this.getStorerooms();
  }


  getStorerooms() {
    this.storeroomService.getStorerooms().subscribe(
      (data: Storeroom[]) => {
        this.storerooms = data;
        this.dataSource = new MatTableDataSource(this.storerooms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStoreroom(value: number) {
    this.storeroomService.deleteStoreroom(value).subscribe(
      data => {
        this.getStorerooms();        
      },
      (error) => {
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
        console.log(error);
      }
    )
  }

  save(value: number) {
    this.router.navigate(['/despensa/cadastrar/' + value]);
  } 
}
