import { Pool, QueryResult } from "pg";
import { PaymentMethod } from "../../domain/entities/Ordens/PaymentsMethods";
import { PaymentsMethodsRepository } from "../../domain/repositories/PaymentsMethodsRepository";

export class PaymentsMethodsRepositoryImpl implements PaymentsMethodsRepository {
    constructor(private pool: Pool) { }

    async findAll(): Promise<PaymentMethod[]> {
        try {
            const payload: QueryResult<PaymentMethod> = await this.pool.query(
                `SELECT id, name FROM payments_methods`
            )
            const paymentMethodes: PaymentMethod[] = payload.rows.map((row) => row as PaymentMethod);
            return paymentMethodes;
        } catch (error) {
            throw new Error("PostgresSql no los metodos de pago");
        }
    }
    async save(name: string): Promise<PaymentMethod> {
        try {
            const id = crypto.randomUUID();
            const payload: QueryResult<PaymentMethod> = await this.pool.query(
                `INSERT INTO payments_methods (id, name) VALUES ($1, $2) RETURNING id, name`,
                [id, name]
            )
            const newPaymentMethod = payload.rows[0] as PaymentMethod;
            return newPaymentMethod;
        } catch (error) {
            throw new Error("PostgresSql no guardo el metodo de pago");
        }
    }

}