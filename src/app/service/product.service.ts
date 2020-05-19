import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  items: Product[] = [];
  constructor() { this.seed(); }

  getProducts() {
    return this.items;
  }

  getProduct(id: number) {
    return this.getProducts().find(item => item._id === +id);
  }

  updateProduct(item) {
    let prod = this.getProduct(item._id);
    this.items[prod._id - 1] = item;
  }

  seed() {
    this.items.push(new Product(1, 'Leite', 'Laticínios', false, 12, 2.49));
    this.items.push(new Product(2, 'Margarina', 'Laticínios', false, 1, 6.49));
    this.items.push(new Product(3, 'Iogurte Nestle Familia', 'Laticínios', false, 1, 12.49));
    this.items.push(new Product(4, 'Pao Integral', 'Padaria', false, 1, 4.49));
    this.items.push(new Product(5, 'Biscoito Recheado', 'Padaria', false, 1, 3.49));
    this.items.push(new Product(6, 'Arroz 5Kg Cocal Miri', 'Perecíveis', false, 1, 13.49));
  }  
}
