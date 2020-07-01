import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { Storeroom } from 'src/app/models/storeroom.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { StoreroomService } from 'src/app/service/storeroom.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/service/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseListService } from 'src/app/service/purchase-list.service';
import { PurchaseList } from 'src/app/models/purchase-list.model';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchaseService } from 'src/app/service/purchase.service';
import { ProductPurchase } from 'src/app/models/productPurchase.model';


@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.css']
})
export class ViewPurchaseComponent implements OnInit {

  id: number;
  purchaseList: PurchaseList;
  products: Product[] = [];
  productPurchase: ProductPurchase[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: ProductPurchase[] = [];

  displayedColumns: string[] = ['nome', 'quantidade', 'valor'];
  dataSource: MatTableDataSource<ProductPurchase>

  constructor(
    private activeroute: ActivatedRoute,
    private purchaseListService: PurchaseListService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = +this.activeroute.snapshot.paramMap.get('id');

    const promisePurchaseList = this.purchaseListService.getPurchaseListById(this.id).toPromise();
    promisePurchaseList.then((data: PurchaseList) => {
      this.purchaseList = data;
      const promiseProducs = this.productService.getProducts().toPromise();
      promiseProducs.then((products: Product[]) => {
        this.products.push(...products);
        this.preencher();
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    })

   //setTimeout(() => { this.preencher(); }, 1000);
  }

 
  preencher() {
    this.purchaseList.compras.forEach(element => {
      let novo: Product[] = this.products.filter(a => element.itemCompraId == a.id);
      this.productPurchase.push({
        id: element.id,
        nome: novo[0].nome,
        categoriaId: null,
        despensaId: null,
        itemCompraId: element.itemCompraId,
        dataCompra: null,
        listaCompraId: this.id,
        quantidade: element.quantidade,
        valor: element.valor,
        comprado: element.comprado
      });
    });
  
    this.dataSource = new MatTableDataSource(this.productPurchase);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  voltar() {
    this.router.navigate(['/historico']);
  }

}
