import { pool } from "../db/postgress_db";
import { OrdenRepositoryImpl } from "../repositories/OrdenRepositoryImpl";

import { GetOrdenById } from "../../application/use-cases/Ordens/GetOrdenById";
import { GetOrdensByUserId } from "../../application/use-cases/Ordens/GetOrdensByUserId";
import { GetOrdensByUserDate } from "../../application/use-cases/Ordens/GetOrdensByUserDate";
import { CreateOrden } from "../../application/use-cases/Ordens/CreateOrden";
import { OrdenController } from "../http/OrdenController";

const repositorie = new OrdenRepositoryImpl(pool);

const getOrdenById = new GetOrdenById(repositorie);
const getOrdensByUserId = new GetOrdensByUserId(repositorie);
const getOrdensByUserDate = new GetOrdensByUserDate(repositorie);
const createOrden = new CreateOrden(repositorie);

export const orden_controller = new OrdenController(getOrdenById, getOrdensByUserId, getOrdensByUserDate, createOrden);