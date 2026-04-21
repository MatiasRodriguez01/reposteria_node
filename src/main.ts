import { envs } from "./infraestructure/config/envs";
import express from "express";
import compression from "compression";

import categoryRouter from "./interfaces/rest/CategoryRouters";
import statusRouter from "./interfaces/rest/orderStatus.routes";
import paymentRouter from "./interfaces/rest/paymentMethods.router";
import orderRouter from "./interfaces/rest/ordenRouters.router";
import userRouter from "./interfaces/rest/userRouters.router";

// la api
const app = express();

app.use(compression());
app.use(express.json());


// rutas
app.use(userRouter);
app.use(orderRouter);
app.use(categoryRouter);
app.use(statusRouter);
app.use(paymentRouter);

// app desde el puerto 3000
app.listen(envs.PORT, () => 
    console.log("✅ Servidor corriendo en puerto " + envs.PORT)
);
