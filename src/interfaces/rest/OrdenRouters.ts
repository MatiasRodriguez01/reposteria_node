import { Router } from "express";
import { OrdenController } from "../../infraestructure/http/OrdenController";
import { validateOrderRequest } from "../../infraestructure/validations/ValidateOrdenRequest";

export function ordenRouters(controller: OrdenController)  {
    const router = Router();

    router.get("/ordenes/:id", controller.getById);
    router.get("/date", controller.getByUserDate);
    router.get("/ordenes", controller.getByUserId);
    router.post("/ordenes", validateOrderRequest, controller.save);

    return router;
}