import { Injectable } from '@angular/core';

import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  items: Category[] = [];
  constructor() { this.seed(); }

  getCategorys() {
    return this.items;
  }

  getCategory(id: number) {
    return this.getCategorys().find(item => item._id === +id);
  }

  updateCategory(item) {
    let prod = this.getCategory(item._id);
    this.items[prod._id - 1] = item;
  }

  seed() {
    this.items.push(new Category(1, 'Frios e Laticínios',));
    this.items.push(new Category(2, 'Carne e Frios'));
    this.items.push(new Category(3, 'Açougue'));
  }  
}
