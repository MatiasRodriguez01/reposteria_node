import { PaymentMethod } from "../../../domain/entities/Ordens/PaymentsMethods";
import { PaymentsMethodsRepository } from "../../../domain/repositories/PaymentsMethodsRepository";

export class CreatePaymentMethod {
  constructor(private readonly repository: PaymentsMethodsRepository) {}

  async execute(name: string): Promise<PaymentMethod> {
    return await this.repository.save(name);
  }
}
