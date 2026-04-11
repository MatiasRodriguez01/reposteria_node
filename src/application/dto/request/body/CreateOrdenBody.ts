export interface CreateOrdenBody {
    userId: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    paymentMethod: string;
    category: string;
}