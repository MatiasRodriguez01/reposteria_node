import { Router } from "express";
import { orderStatusController } from "../dependecies/order_status_controller";  // instancia del controller

const statusRouter = Router();

statusRouter.get("/order-status", orderStatusController.getAll);
statusRouter.post("/order-status", orderStatusController.create);

export default statusRouter;
