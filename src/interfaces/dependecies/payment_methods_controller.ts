import { pool } from "../../infraestructure/db/postgress_db";
import { OrderStatusRepositoryImpl } from "../../infraestructure/repositories/OrderStatusRepositoryImpl";


import { PaymentMethodsController } from "../../infraestructure/http/PaymentMethodsController";
import { GetPaymentMethods } from "../../application/use-cases/PaymentMethods/GetPaymentMethods";
import { CreatePaymentMethod } from "../../application/use-cases/PaymentMethods/CreatePaymentMethod";
import { PaymentsMethodsRepositoryImpl } from "../../infraestructure/repositories/PaymentsMethodsRepositoryImpl";

const paymentsMethodsRepositoryImpl = new PaymentsMethodsRepositoryImpl(pool)

// Casos de uso
const getPaymentMethods = new GetPaymentMethods(paymentsMethodsRepositoryImpl);
const createPaymentMethod = new CreatePaymentMethod(paymentsMethodsRepositoryImpl);

// Instancia del controlador
export const paymentMethodsController = new PaymentMethodsController(getPaymentMethods, createPaymentMethod);
