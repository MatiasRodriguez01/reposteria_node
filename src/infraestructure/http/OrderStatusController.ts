import { Request, Response } from "express";
import { GetOrderStatus } from "../../application/use-cases/OrderStatus/GetOrderStatus";
import { CreateOrderStatus } from "../../application/use-cases/OrderStatus/CreateOrderStatus";

export class OrderStatusController {
  constructor(
    private readonly getOrderStatus: GetOrderStatus,
    private readonly createOrderStatus: CreateOrderStatus
  ) {}

  getAll = async (req: Request, res: Response) => {
    const statuses = await this.getOrderStatus.execute();
    res.json(statuses);
  };

  create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const status = await this.createOrderStatus.execute(name);
    res.status(201).json(status);
  };
}
