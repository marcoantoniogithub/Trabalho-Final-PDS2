export class Product {
    _id: number;
    _item: string
    _categoria: string;
    _comprado: boolean;
    _quantidade: number;
    _valor: number;

    constructor(id: number, item: string, categoria: string, comprado: boolean, quantidade: number, valor: number) {
       this._id = id;
       this._item = item;
       this._categoria = categoria;
       this._comprado = comprado;
       this._quantidade = quantidade;
       this._valor = valor;             
    }
}