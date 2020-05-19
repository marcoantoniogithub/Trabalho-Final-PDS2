import { Injectable } from '@angular/core';

import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  items: Product[];
  constructor() { }

  getProducts() {
    this.items = this.seed();
    return this.items;
  }
 
  getProduct(id: number){
    return this.getProducts().find(item => item.id === +id);
  }

  seed() {
    return [
      {
        id: 1,
        item: 'Leite',
        categoria: 'Laticínios',
        comprado: false,
        quantidade: 12,
        valor: 2.49
      },
      {
        id: 2,
        item: 'Margarina',
        categoria: 'Laticínios',
        comprado: false,
        quantidade: 1,
        valor: 6.49
      },
      {
        id: 3,
        item: 'Iogurte Nestle Familia',
        categoria: 'Laticínios',
        comprado: false,
        quantidade: 1,
        valor: 12.49
      },
      {
        id: 4,
        item: 'Pao Integral',
        categoria: 'Padaria',
        comprado: false,
        quantidade: 1,
        valor: 4.49
      },
      {
        id: 5,
        item: 'Biscoito Recheado',
        categoria: 'Padaria',
        comprado: false,
        quantidade: 1,
        valor: 3.49
      },
      {
        id: 6,
        item: 'Arroz 5Kg Cocal Miri',
        categoria: 'Perecíveis',
        comprado: false,
        quantidade: 1,
        valor: 13.49
      }

    ]
  }

}
