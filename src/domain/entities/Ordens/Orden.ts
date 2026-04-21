import { OrdenItem } from "./OrdenItem";

export class Orden {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly totalPrice: number,
        readonly statusId: string,
        readonly createdAt: Date,
        readonly paymentMethodId: string,
    ){

    }
}