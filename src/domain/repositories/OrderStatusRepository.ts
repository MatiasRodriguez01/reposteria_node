import { OrderStatus } from "../entities/Ordens/OrderStatus";

export interface OrderStatusRepository {
    findAll(): Promise<OrderStatus[]>;
    save(name: string): Promise<OrderStatus>;
}