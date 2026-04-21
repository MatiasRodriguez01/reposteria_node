import { PaymentMethod } from "../entities/Ordens/PaymentsMethods";

export interface PaymentsMethodsRepository {
    findAll(): Promise<PaymentMethod[]>;
    save(name: string): Promise<PaymentMethod>;
}