import { Router } from "express";
import { CategoryController } from "../../infraestructure/http/CategoryController";

export function categoryRouters(controller: CategoryController) {
    const router = Router();

    router.get("/categories", controller.getAll);
    router.post("/categories", controller.create);

    return router;
}