import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from 'src/app/models/Product.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PurchaseList } from 'src/app/models/purchase-list.model';
import { PurchaseListService } from 'src/app/service/purchase-list.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductPurchase } from 'src/app/models/productPurchase.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-buy-itens',
  templateUrl: './buy-itens.component.html',
  styleUrls: ['./buy-itens.component.css']
})
export class BuyItensComponent implements OnInit {

  id: number;
  purchaseList: PurchaseList;
  products: Product[] = [];
  productPurchase: ProductPurchase[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: ProductPurchase[] = [];

  displayedColumns: string[] = ['nome', 'quantidade','valor'];
  dataSource: MatTableDataSource<ProductPurchase>

  constructor(
    private activeroute: ActivatedRoute,
    private purchaseListService: PurchaseListService,
    private productService: ProductService
  ) { }

  async ngOnInit(){

    this.id = +this.activeroute.snapshot.paramMap.get('id');

    await this.getPurchaseList();
    await this.getProducts();
    setTimeout(() => {this.preencher();}, 3000);
  }

  async getProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products.push(...products);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPurchaseList(){
    this.purchaseListService.getPurchaseListById(this.id).subscribe(
      (data: PurchaseList) => {
        this.purchaseList = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  preencher(){
    
    this.purchaseList.compras.forEach(element => {
      let novo: Product[]= this.products.filter(a => element.itemCompraId == a.id);
      this.productPurchase.push({
        id: novo[0].id,
        nome: novo[0].nome,
        categoriaId: null,
        despensaId: null,
        itemCompraId: null,
        dataCompra : null,
        listaCompraId: null,
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

  concluirCompra(){
    console.log(this.dataSource.data);
  }
}
