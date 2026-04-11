export class Producto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly categorie_id: string
    ) { }
}