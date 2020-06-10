import { Category } from './category.model';
import { Storeroom } from './storeroom.model';

export class Product {
    id: number;
    nome: string;
    categoriaId:number;
    despensaId: number;
    usuario: string = '';
    checked: boolean = false;
}