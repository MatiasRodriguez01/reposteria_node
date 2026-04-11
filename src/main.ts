import express from "express";
import compression from "compression";

import { userRouters } from "./interfaces/rest/UserRouters";
import { ordenRouters } from "./interfaces/rest/OrdenRouters";
import { categoryRouters } from "./interfaces/rest/CategoryRouters";

import { user_controller } from "./infraestructure/config/user_controller";
import { orden_controller } from "./infraestructure/config/orden_controller";
import { category_controller } from "./infraestructure/config/category_controller";

// la api
const app = express();

app.use(compression());
app.use(express.json());

// rutas
app.use(userRouters(user_controller));
app.use(ordenRouters(orden_controller));
app.use(categoryRouters(category_controller));

// app desde el puerto 3000
app.listen(3000, () => 
    console.log("✅ Servidor corriendo en puerto 3000")
);
