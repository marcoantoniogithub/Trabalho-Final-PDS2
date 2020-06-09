import { Category } from './category.model';
import { Storeroom } from './storeroom.model';

export class Product {
    id: number;
    nome: string;
    categoriaId:number;
    categorias: Category;
    despensaId: number;
    despensas: Storeroom;
    usuario: string = '';
}