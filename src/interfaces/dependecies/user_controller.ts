import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { GetUserById } from "../../application/use-cases/Users/GetUserById";
import { GetUsers } from "../../application/use-cases/Users/GetUsers";
import { UpdateUser } from "../../application/use-cases/Users/UpdateUser";
import { pool } from "../../infraestructure/db/postgress_db";
import { UserController } from "../../infraestructure/http/UserController";

import { UserRepositoryImpl } from "../../infraestructure/repositories/UserRepositoryImpl";
import { BcryptHashService } from "../../infraestructure/security/BcryptHashService";

// Repositorios 
const repositorie = new UserRepositoryImpl(pool);

// dependencias
const hashService = new BcryptHashService();

// casos de uso para usuario
const createUser = new CreateUser(repositorie, hashService);
const getUserById = new GetUserById(repositorie);
const getUsers = new GetUsers(repositorie);
const updateUser = new UpdateUser(repositorie);

// controlador 
export const user_controller = new UserController(getUserById, getUsers, createUser, updateUser);