import type { Request, Response } from "express";

import { User } from "../../domain/entities/users/User"; 

import { GetUsers } from "../../application/use-cases/Users/GetUsers";
import { GetUserById } from "../../application/use-cases/Users/GetUserById";
import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { UpdateUser } from "../../application/use-cases/Users/UpdateUser";  

import { ParamId } from "../../application/dto/request/params/ParamId";
import { CreateUserBody } from "../../application/dto/request/body/CreateUserBody";
import { QueryUpdateUser } from "../../application/dto/request/querys/QueryUpdateUser";

import { toUserResponseDTO, UserResponseDTO } from "../../application/dto/responses/UserResponseDTO";

export class UserController {
    constructor(
        private getUserById: GetUserById,
        private getUsers: GetUsers,
        private createUser: CreateUser,
        private updateUser: UpdateUser
    ) {}

    getAll = async(req: Request, res: Response) => {
        const users: User[] = await this.getUsers.execute();

        if (users.length == 0) {
            return res.status(404).json({ message: "No encontramos usuarios" })
        }
        return res.status(200).json(users)
    }

    getById = async(req: Request<ParamId, any, any, any>, res: Response) => {
        const id = req.params.id;
        const result: User | null = await this.getUserById.execute(id);

        if (!result) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const user: UserResponseDTO = toUserResponseDTO(result)
        return res.status(200).json(user);
    }

    create = async(req: Request<any, any, CreateUserBody, any>, res: Response) => {
        const requestUser = req.body;
        const result: User = await this.createUser.execute(requestUser);

        return res.status(201).json(result);
    }

    update_item = async(req: Request<any, any, any, QueryUpdateUser>, res: Response) => {
        const { item, value } = req.query;
        const id = req.params.id;

        // Lista blanca de columnas
        const allowedItems = ["username", "email", "phone", "password"];
        if (!allowedItems.includes(item)) {
            return res.status(400).json({ error: "Campo no permitido para actualización" });
        }

        const result: User = await this.updateUser.execute(id, item, value);

        return res.status(200).json(result);
    }
} 
