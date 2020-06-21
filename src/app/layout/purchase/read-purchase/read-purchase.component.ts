import { Component, OnInit, ViewChild } from '@angular/core';
import { Storeroom } from 'src/app/models/storeroom.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/service/loader.service';
import { Router } from '@angular/router';
import { PurchaseListService } from 'src/app/service/purchase-list.service';
import { PurchaseList } from 'src/app/models/purchase-list.model';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-read-purchase',
  templateUrl: './read-purchase.component.html',
  styleUrls: ['./read-purchase.component.css']
})
export class ReadPurchaseComponent implements OnInit {

  mrkBuy: boolean = true;
  purchaseList: PurchaseList[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Storeroom[] = [];

  displayedColumns: string[] = ['nome', 'acoes'];
  dataSource: MatTableDataSource<PurchaseList>

  constructor(
    private purchaseListService: PurchaseListService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private router:Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.getStoreRoom();
  }

  async getStoreRoom() {
    this.loaderService.show();
    this.purchaseListService.getPurchaseList().subscribe(
      (data: PurchaseList[]) => {
        this.purchaseList = [];
        this.purchaseList.push(...data);
        this.dataSource = new MatTableDataSource(this.purchaseList);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePurchase(id: number) {
    this.purchaseListService.deletePurchaseList(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Ops algo deu errado!', '', { duration: 2000 });
      }
    )
  }

  editPurchase(id:number) {
    this.router.navigate(['/lista/cadastrar/' + id]);
  }
}
