import { PayementMethod } from "../entities/Ordens/PaymentsMethods";

export interface PaymentsMethodsRepository {
    findId(name: string): Promise<string>;
    findById(id: string): Promise<PayementMethod>;
    findAll(): Promise<PayementMethod[]>;
    save(payementMethod: PayementMethod): Promise<PayementMethod>;
}