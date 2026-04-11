import { pool } from "../db/postgress_db";

import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";

import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { GetUserById } from "../../application/use-cases/Users/GetUserById";
import { GetUsers } from "../../application/use-cases/Users/GetUsers";
import { UpdateUser } from "../../application/use-cases/Users/UpdateUser";

import { UserController } from "../http/UserController";

// Repositorios 
const repositorie = new UserRepositoryImpl(pool);

// casos de uso para usuario
const createUser = new CreateUser(repositorie);
const getUserById = new GetUserById(repositorie);
const getUsers = new GetUsers(repositorie);
const updateUser = new UpdateUser(repositorie);

// controlador 
export const user_controller = new UserController(getUserById, getUsers, createUser, updateUser);