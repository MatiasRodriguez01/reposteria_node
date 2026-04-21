import { Router } from "express";
import { category_controller } from "../dependecies/category_controller";

const categoryRouter = Router();

categoryRouter.get("/categories", category_controller.getAll);
categoryRouter.post("/categories", category_controller.create);

export default categoryRouter;