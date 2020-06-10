import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { LoaderService } from 'src/app/service/loader.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category.model';



@Component({
  selector: 'app-form-purchase',
  templateUrl: './form-purchase.component.html',
  styleUrls: ['./form-purchase.component.css']
})
export class FormPurchaseComponent implements OnInit {

  products: Product[] = [];
  categorias: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
  ) {
   
  }

  ngOnInit() {  
    this.loadPage();
  }

  loadPage() {
    this.loaderService.show();
    this.categoryService.getCategories()
      //mergeMap(item => item))
      .subscribe(categorias => {
        this.categorias = categorias;
        this.loaderService.hide();
      })
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (produtos: Product[]) => {
        this.products.push(...produtos);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categorias: Category[]) => {
        this.categorias.push(...categorias);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductByCategoriaId(id: number) {    
    this.productService.getProductForCategory(id).subscribe(
      (produtos: Product[]) => {
        this.products = [];
        this.products.push(...produtos);
        console.log(produtos);
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
