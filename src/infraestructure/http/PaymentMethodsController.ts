import { Request, Response } from "express";
import { GetPaymentMethods } from "../../application/use-cases/PaymentMethods/GetPaymentMethods";
import { CreatePaymentMethod } from "../../application/use-cases/PaymentMethods/CreatePaymentMethod";

export class PaymentMethodsController {
  constructor(
    private readonly getPaymentMethods: GetPaymentMethods,
    private readonly createPaymentMethod: CreatePaymentMethod
  ) {}

  getAll = async (req: Request, res: Response) => {
    const methods = await this.getPaymentMethods.execute();
    res.json(methods);
  };

  create = async (req: Request, res: Response) => {
    const { name } = req.body;
    const method = await this.createPaymentMethod.execute(name);
    res.status(201).json(method);
  };
}
