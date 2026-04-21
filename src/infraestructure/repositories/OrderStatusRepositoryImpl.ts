import { Pool, QueryResult } from "pg";
import { OrderStatusRepository } from "../../domain/repositories/OrderStatusRepository";
import { OrderStatus } from "../../domain/entities/Ordens/OrderStatus";


export class OrderStatusRepositoryImpl implements OrderStatusRepository {
    constructor(private pool: Pool) { }

    async findAll(): Promise<OrderStatus[]> {
        try {
            const payload: QueryResult<OrderStatus> = await this.pool.query(
                `SELECT id, name FROM order_status`
            )
            const OrderStatus: OrderStatus[] = payload.rows.map((row) => row as OrderStatus);
            return OrderStatus;
        } catch (error) {
            throw new Error("PostgresSql no los metodos de pago");
        }
    }
    async save(name: string): Promise<OrderStatus> {
        try {
            const id: string = crypto.randomUUID();
            const payload: QueryResult<OrderStatus> = await this.pool.query(
                `INSERT INTO order_status (id, name) VALUES ($1, $2) RETURNING id, name`,
                [id, name]
            )
            const newOrderStatus = payload.rows[0] as OrderStatus;
            return newOrderStatus;
        } catch (error) {
            throw new Error("PostgresSql no guardo el metodo de pago");
        }
    }

}