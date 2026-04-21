import { OrderStatus } from "../../../domain/entities/Ordens/OrderStatus";
import { OrderStatusRepository } from "../../../domain/repositories/OrderStatusRepository";

export class GetOrderStatus {
  constructor(private readonly repository: OrderStatusRepository) {}

  async execute(): Promise<OrderStatus[]> {
    return await this.repository.findAll();
  }
}
