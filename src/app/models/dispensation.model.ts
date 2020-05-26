export class Dispensation{
    _id: number;
    _title: string;
    _usuario: string;

    constructor(id: number, title: string, usuario: string){
        this._id = id;
        this._title = title;
        this._usuario = usuario;
    }
}