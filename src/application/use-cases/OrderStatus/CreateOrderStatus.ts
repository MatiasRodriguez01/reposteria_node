import crypto from "crypto";
import { OrderStatus } from "../../../domain/entities/Ordens/OrderStatus";
import { OrderStatusRepository } from "../../../domain/repositories/OrderStatusRepository";

export class CreateOrderStatus {
  constructor(private readonly repository: OrderStatusRepository) {}

  async execute(name: string): Promise<OrderStatus> {;
    return await this.repository.save(name);
  }
}
