import { Router } from "express";
import { UserController } from "../../infraestructure/http/UserController";

export function userRouters(controller: UserController) {
    const router = Router();

    router.get("/users", controller.getAll);
    router.get("/users/:id", controller.getById);
    router.post("/users", controller.create);
    router.put("/users/:id", controller.update_item);
    
    return router;
}