import { Purchase } from './purchase.model';

export class PurchaseList {
    id: number;
    nome: string;
    efetuada: boolean;
    compras: Purchase[];
}