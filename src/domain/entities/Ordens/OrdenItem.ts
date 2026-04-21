import { Producto } from "../Products/Product";

export class OrdenItem {
    constructor(
        readonly id: string,
        readonly productoId: string,   // Un solo producto asociado
        readonly idOrden: string,
        readonly quantity: number,
        readonly unitPrice: number
    ) {}

    get subTotal(): number {
        return this.quantity * this.unitPrice;
    }
}