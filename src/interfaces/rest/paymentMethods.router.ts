import { Router } from "express";
import { paymentMethodsController } from "../dependecies/payment_methods_controller";

const paymentRouter = Router();

paymentRouter.get("/payment-methods", paymentMethodsController.getAll);
paymentRouter.post("/payment-methods", paymentMethodsController.create);

export default paymentRouter;
