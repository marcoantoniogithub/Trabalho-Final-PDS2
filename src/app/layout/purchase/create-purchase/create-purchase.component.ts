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


@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.css']
})
export class CreatePurchaseComponent implements OnInit {

  products: Product[] = [];
  product: Product;
  categorias: Category[] = [];
  storeroom: Storeroom[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  purchaseList: PurchaseList;
  //purchases: Purchase[] = [];
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ELEMENT_DATA: Product[] = [];

  displayedColumns: string[] = ['nome', 'categoria', 'despensa', 'acoes'];
  dataSource: MatTableDataSource<Product>

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private storeroomService: StoreroomService,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private purchaseListService: PurchaseListService,
    private purchaseService: PurchaseService,
    private activeroute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.products = [];
    this.categorias = [];

    this.firstFormGroup = this._formBuilder.group({
      nome: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.id = +this.activeroute.snapshot.paramMap.get('id');

    if (this.id > 0) {
      this.purchaseListService.getPurchaseListById(this.id).subscribe(
        (data: PurchaseList) => {
          this.purchaseList = data;
          this.firstFormGroup.controls['nome'].setValue(data.nome);
        },
        (error) => {
          console.log(error);
        }
      )
    }

    this.loadData();
  }

  loadData() {
    const promiseStoreRoom = this.storeroomService.getStorerooms().toPromise();
    promiseStoreRoom.then((data: Storeroom[]) => {
      this.storeroom.push(...data);
      const promiseCategories = this.categoryService.getCategories().toPromise();
      promiseCategories.then((categorias: Category[]) => {
        this.categorias.push(...categorias);
        const promiseProduto = this.productService.getProducts().toPromise();
        promiseProduto.then((produtos: Product[]) => {
          this.products.push(...produtos);
          //Carregando o datasource
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loaderService.hide();
          this.products.forEach(element => {           
            if (this.id > 0) {
              let item: Purchase = this.purchaseList.compras.find(a => a.itemCompraId == element.id);                            
              if(item != undefined) {
                element.compraId = item.id;
                element.comprar = 1; 
              } 
              else{
                element.compraId = 0;
                element.comprar = 0; 
              }            
            } else {
              element.compraId = 0;
              element.comprar = 0;             
            }
          });
        }, (error) => {
          console.log(error);
        })

      }, (error) => {
        console.log(error);
      })

    }, (error) => {
      console.log(error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearProduct(nome: string) {
    this.products.forEach(element => {
      if (element.nome == nome)
        element.comprar = 0;
    });
  }

  getCategoriaNome(id: number): string {
    return this.categorias.find(value => value.id == id).nome;
  }

  getStoreroomNome(id: number): string {
    return this.storeroom.find(value => value.id == id).title;
  }

  addProduct(nome: string) {
    this.products.forEach(element => {
      if (element.nome == nome)
        element.comprar += 1;        
    });
  }

  submit() {

    this.loaderService.show();
    //Criar lista de compra no banco
    let value = this.firstFormGroup.getRawValue() as PurchaseList;
    value.efetuada = false;
    this.purchaseListService.addPurchaseList(this.firstFormGroup.value).subscribe(
      (data) => {
        this.addItensList(data.value.id);
        this.loaderService.hide();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  update() {
    this.loaderService.show();
    let lista = +this.activeroute.snapshot.paramMap.get('id');  
    let itens = this.products.filter(i => i.compraId > 0);    
    itens.forEach(element=> {
      this.purchaseService.deletePurchase(element.compraId).subscribe(        
      );
    });    
    this.putItensList(lista);
  }

  addItensList(idPurchase: number) {
    let itens = this.products.filter(i => i.comprar > 0);
    itens.forEach(element => {
      let item: any = {
        itemCompraId: Number(element.id),
        dataCompra: null,
        listaCompraId: idPurchase,
        quantidade: 0,
        valor: null,
        comprado: false
      }

      this.purchaseService.addPurchase(item).subscribe(
        (data) => {
          this.router.navigate(['/lista']);
        }
      )
    });
  }

  putItensList(idPurchase: number) {
    let itens = this.products.filter(i => i.comprar > 0);
    itens.forEach(element => {
      let item: any = {
        compraId: Number(element.compraId),
        itemCompraId: Number(element.id),
        dataCompra: null,
        listaCompraId: idPurchase,
        quantidade: 0,
        valor: null,
        comprado: false
      }

      this.purchaseService.addPurchase(item).subscribe(
        (data) => {         
          this.router.navigate(['/lista']);
        }
      )      
    });
  }
}
