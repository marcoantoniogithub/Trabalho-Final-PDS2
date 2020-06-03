import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-form-purchase',
  templateUrl: './form-purchase.component.html',
  styleUrls: ['./form-purchase.component.css']
})
export class FormPurchaseComponent implements OnInit {

  isLinear = true;
  products: Product[] = []
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private productService: ProductService,
    private _formBuilder: FormBuilder,
    private loaderService: LoaderService)
  {}

  async ngOnInit() {
    await this.getProducts();
    this.firstFormGroup = this._formBuilder.group({
      nome: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      itens: ['', Validators.required]
    });
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

  submitAll() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}
