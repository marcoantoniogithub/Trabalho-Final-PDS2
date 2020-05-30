import { Category } from './category.model';

export class Product {
    id: number;
    nome: string;
    quantidade: number;
    valor: number;
    categoriaId:number;
    categorias: Category;
    comprado: boolean;
    usuario: string = '';
}