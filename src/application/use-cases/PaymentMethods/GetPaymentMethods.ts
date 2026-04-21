import { PaymentMethod } from "../../../domain/entities/Ordens/PaymentsMethods";
import { PaymentsMethodsRepository } from "../../../domain/repositories/PaymentsMethodsRepository";

export class GetPaymentMethods {
  constructor(private readonly repository: PaymentsMethodsRepository) {}

  async execute(): Promise<PaymentMethod[]> {
    return await this.repository.findAll();
  }
}
