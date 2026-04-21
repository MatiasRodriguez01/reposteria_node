import { pool } from "../../infraestructure/db/postgress_db";
import { GetOrderStatus } from "../../application/use-cases/OrderStatus/GetOrderStatus";
import { CreateOrderStatus } from "../../application/use-cases/OrderStatus/CreateOrderStatus";
import { OrderStatusController } from "../../infraestructure/http/OrderStatusController";
import { OrderStatusRepositoryImpl } from "../../infraestructure/repositories/OrderStatusRepositoryImpl";

// repositorio
const orderStatusRepository = new OrderStatusRepositoryImpl(pool)

// Instancia de casos de uso
const getOrderStatus = new GetOrderStatus(orderStatusRepository);
const createOrderStatus = new CreateOrderStatus(orderStatusRepository);

// Instancia del controlador
export const orderStatusController = new OrderStatusController(getOrderStatus, createOrderStatus);


