import { Router } from "express";
import { user_controller } from "../dependecies/user_controller";

const userRouter = Router();

userRouter.get("/users", user_controller.getAll);
userRouter.get("/users/:id", user_controller.getById);
userRouter.post("/users", user_controller.create);
userRouter.put("/users/:id", user_controller.update_item);

export default userRouter;