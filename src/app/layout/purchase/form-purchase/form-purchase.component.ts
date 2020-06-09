import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { LoaderService } from 'src/app/service/loader.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-form-purchase',
  templateUrl: './form-purchase.component.html',
  styleUrls: ['./form-purchase.component.css']
})
export class FormPurchaseComponent implements OnInit {

  isLinear = true;
  products: Product[] = [];
  categorias: Category[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private productService: ProductService,
    private _formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
  ){
    this.dataSource.data = TREE_DATA;
  }

  

  async ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nome: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      // nome: ['', Validators.required]
    });
    await this.getProducts();
  }

  async getProducts() {
    this.loaderService.show();
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products.push(...products);
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
        console.log(error);
      }
    );
  }

  async getCategories() {
    this.categoryService.getCategories().subscribe(
      (categorias: Category[]) => {
        this.categorias.push(...categorias);
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
