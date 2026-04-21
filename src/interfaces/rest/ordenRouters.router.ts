import { Router } from "express";
import { orden_controller } from "../dependecies/orden_controller";
import { validateOrderRequest } from "../../infraestructure/validations/ValidateOrdenRequest";

const orderRouter = Router();

orderRouter.get("/ordenes/:id", orden_controller.getById);
orderRouter.get("/date", orden_controller.getByUserDate);
orderRouter.get("/ordenes", orden_controller.getByUserId);
orderRouter.post("/ordenes", validateOrderRequest, orden_controller.save);

export default orderRouter;