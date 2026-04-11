import { Pool, QueryResult } from "pg";
import { PaymentMethod } from "../../domain/entities/Ordens/PaymentsMethods";
import { PaymentsMethodsRepository } from "../../domain/repositories/PaymentsMethodsRepository";

export class PaymentsMethodsRepositoryImpl implements PaymentsMethodsRepository {
    constructor(private pool: Pool) { }

    async findId(name: string): Promise<string> {
        try {
            const payload: QueryResult<{ id: string }> = await this.pool.query(
                `SELECT id FROM payments_methods WHERE name = $1`,
                [name]
            )
            const id = payload.rows[0]?.id as string;
            return id;
        } catch (error) {
            throw new Error("PostgresSql no encontro el ID del metodo de pago");
        }
    }
    async findById(id: string): Promise<PaymentMethod> {
        try {
            const payload: QueryResult<PaymentMethod> = await this.pool.query(
                `SELECT id, name FROM payments_methods WHERE id = $1`,
                [id]
            )
            const paymentMethod = payload.rows[0] as PaymentMethod;
            return paymentMethod;
        } catch (error) {
            throw new Error("PostgresSql no encontro el metodo de pago");
        }
    }
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
    async save(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        try {
            const payload: QueryResult<PaymentMethod> = await this.pool.query(
                `INSERT INTO payments_methods (id, name) VALUES ($1, $2) RETURNING id, name`,
                [paymentMethod.id, paymentMethod.name]
            )
            const newPaymentMethod = payload.rows[0] as PaymentMethod;
            return newPaymentMethod;
        } catch (error) {
            throw new Error("PostgresSql no guardo el metodo de pago");
        }
    }

}