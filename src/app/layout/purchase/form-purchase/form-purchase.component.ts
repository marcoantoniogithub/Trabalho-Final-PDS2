import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { LoaderService } from 'src/app/service/loader.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeFlattener } from '@angular/material/tree';
import { mergeMap, tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-form-purchase',
  templateUrl: './form-purchase.component.html',
  styleUrls: ['./form-purchase.component.css']
})
export class FormPurchaseComponent implements OnInit {

  products: Product[] = [];
  categorias: Category[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //nestedTreeControl: NestedTreeControl<CategoryNode>;
  //dataSource: MatTreeNestedDataSource<Category>;

  constructor(
    private productService: ProductService,
    private _formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
  ) {
    //this.dataSource = new MatTreeNestedDataSource();    
  }

  ngOnInit() {
    /* this.firstFormGroup = this._formBuilder.group({
       nome: ['', Validators.required]
     });
     this.secondFormGroup = this._formBuilder.group({
       // nome: ['', Validators.required]
     });
     //this.getProducts();
     //this.dataSource = this.categorias;*/
    this.loadPage();
    //console.log(this.categorias);
  }

  loadPage() {
    this.loaderService.show();
    this.categoryService.getCategories()
      //mergeMap(item => item))
      .subscribe(items => {
        this.categorias = items;
        //this.getProductById(items.id);
        //console.log(this.categorias);
        //console.log(this.products);
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
        this.products.push(...produtos);
        console.log(produtos);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitAll() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}
