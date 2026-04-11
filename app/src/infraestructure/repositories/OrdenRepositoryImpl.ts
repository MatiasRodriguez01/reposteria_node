import { Pool, type QueryResult } from "pg";

import { Orden } from "../../domain/entities/Ordens/Orden";
import { OrdenItem } from "../../domain/entities/Ordens/OrdenItem";
import { Producto } from "../../domain/entities/Products/Product";

import { OrdenRepository } from "../../domain/repositories/OrdenRepository";

import { CreateOrdenBody } from "../../application/dto/request/body/CreateOrdenBody";
import { OrdenResponseDTO } from "../../application/dto/responses/OrdenResponseDTO";
import { ConsultIds } from "../../application/dto/consultes/ConsultesIds";

export class OrdenRepositoryImpl implements OrdenRepository {
    constructor(private pool: Pool) { }

    async findById(id: string): Promise<OrdenResponseDTO> {
        try {
            const payload: QueryResult<OrdenResponseDTO> = await this.pool.query(
                `SELECT o.id,
                        o.total_price,
                        os.name AS status,
                        o.created_at,
                        pm.name AS payment_method
                 FROM orders o
                 JOIN order_status os ON o.status_id = os.id
                 JOIN payments_methods pm ON o.payment_method_id = pm.id
                 WHERE o.id = $1`,
                [id]
            )

            const result = payload.rows[0] as OrdenResponseDTO;

            return result;
        } catch (error) {
            throw new Error("PostgreSQL no devolvio la orden (ID)");
        }
    }

    async findByUserId(userId: String): Promise<OrdenResponseDTO[]> {
        try {
            const payload: QueryResult<OrdenResponseDTO> = await this.pool.query(
                `SELECT o.id,
                        o.total_price,
                        os.name AS status,
                        o.created_at,
                        pm.name AS payment_method
                 FROM orders o
                 JOIN order_status os ON o.status_id = os.id
                 JOIN payments_methods pm ON o.payment_method_id = pm.id
                 WHERE o.user_id = $1
                 ORDER BY o.created_at DESC`,
                [userId]
            )
            const result = payload.rows as OrdenResponseDTO[];
            return result;

        } catch (error) {
            throw new Error("PostgreSQL no devolvio las ordenes (User ID)");
        }
    }

    async findByUserDate(userId: string, data: string): Promise<OrdenResponseDTO[]> {
        await this.pool.query("BEGIN");
        const payload: QueryResult<OrdenResponseDTO> = await this.pool.query(
            `SELECT o.id,
                        o.total_price,
                        os.name AS status,
                        o.created_at,
                        pm.name AS payment_method
                 FROM orders o
                 JOIN order_status os ON o.status_id = os.id
                 JOIN payments_methods pm ON o.payment_method_id = pm.id
                 WHERE user_id = $1
                  AND created_at::date = $2
                 ORDER BY created_at DESC`,
            [userId, data]
        )

        await this.pool.query("ROLLBACK");
        const result = payload.rows as OrdenResponseDTO[];
        return result;
    }

    async save(userId: string, orden: CreateOrdenBody): Promise<OrdenResponseDTO> {

        await this.pool.query("BEGIN");

        try {
            const consult_ids: QueryResult<ConsultIds> = await this.pool.query(
                `SELECT c.id AS id_categorie,
                        pm.id AS id_payment,
                        os.id AS id_status
                 FROM categories c, payments_methods pm, order_status os
                 WHERE c.name = $1
                   AND pm.name = $2
                   AND os.name = $3`,
                [orden.category, orden.paymentMethod, "pendiente"]
            )

            const id_cate = consult_ids.rows[0]?.id_categorie as string;
            const id_paym = consult_ids.rows[0]?.id_payment as string;
            const id_status = consult_ids.rows[0]?.id_status as string;

            const product = new Producto(crypto.randomUUID(), orden.name, orden.description, orden.price, id_cate);

            await this.pool.query(
                `INSERT INTO products (id, name, description, price, category_id) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [product.id, product.name, product.description, product.price, product.categorie_id]
            );

            const idOrden = crypto.randomUUID();
            const orden_item = new OrdenItem(crypto.randomUUID(), product.id, idOrden, orden.quantity, orden.price);

            const newOrden = new Orden(idOrden, userId, orden_item.subTotal, id_status, new Date(), id_paym);

            await this.pool.query(
                `INSERT INTO orders (id, user_id, total_price, status_id, created_at, payment_method_id) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [newOrden.id, newOrden.userId, newOrden.totalPrice, newOrden.statusId, newOrden.createdAt, newOrden.paymentMethodId]
            );

            await this.pool.query(
                `INSERT INTO order_items (id, order_id, product_id, quantity, price) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [orden_item.id, newOrden.id, orden_item.productoId, orden_item.quantity, orden_item.unitPrice]
            );

            const payload: QueryResult<OrdenResponseDTO> = await this.pool.query(`
                SELECT o.id,
                        o.total_price,
                        os.name AS status,
                        o.created_at,
                        pm.name AS payment_method
                 FROM orders o
                 JOIN order_status os ON o.status_id = os.id
                 JOIN payments_methods pm ON o.payment_method_id = pm.id
                 WHERE o.id = $1`,
                [idOrden]
            );

            await this.pool.query("COMMIT");
            const result = payload.rows[0] as OrdenResponseDTO;
            return result;


        } catch (error) {
            await this.pool.query("ROLLBACK");
            throw new Error("PostgreSQL no creo el item de orden (CreateOrdenDTO).");
        }

    }
}
