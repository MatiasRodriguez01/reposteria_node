import { Request, Response } from "express";

import { GetOrdenById } from "../../application/use-cases/Ordens/GetOrdenById";
import { GetOrdensByUserId } from "../../application/use-cases/Ordens/GetOrdensByUserId";
import { GetOrdensByUserDate } from "../../application/use-cases/Ordens/GetOrdensByUserDate";
import { CreateOrden } from "../../application/use-cases/Ordens/CreateOrden"; 

import { ParamId } from "../../application/dto/request/params/ParamId";
import { CreateOrdenBody } from "../../application/dto/request/body/CreateOrdenBody";
import { QueryOrderByDate } from "../../application/dto/request/querys/QueryOrderByDate";
import { QueryUserId } from "../../application/dto/request/querys/QueryUserId";

import { OrdenResponseDTO } from "../../application/dto/responses/OrdenResponseDTO"; 

export class OrdenController {
    constructor(
        private getOrdenById: GetOrdenById,
        private getOrdensByUserId: GetOrdensByUserId, 
        private getOrdensByUserDate: GetOrdensByUserDate,
        private createOrden: CreateOrden
    ) {}

    getById = async (req: Request<ParamId, any, any, any>, res: Response) => {
        const id = req.params.id;
        const orden: OrdenResponseDTO = await this.getOrdenById.execute(id);

        if (!orden) {
            return res.status(404).json(
                { message: "Orden no encontrada"}

            )
        }
        res.status(200).json(orden);
    }

    getByUserId = async (req: Request<any, any, any, QueryUserId>, res: Response) => {
        const userId = req.query.userId;
        const ordenes: OrdenResponseDTO[] = await this.getOrdensByUserId.execute(userId);

        if (!ordenes || ordenes.length === 0) {
            return res.status(404).json(
                { message: "Ordenes no encontradas"}
            )
        }
        res.status(200).json(ordenes);
    }

    getByUserDate = async (req: Request<any, any, any, QueryOrderByDate>, res: Response) => {
        const userId = req.query.userId;  
        const date = req.query.date;

        const ordenes: OrdenResponseDTO[] = await this.getOrdensByUserDate.execute(userId, date);

        if (!ordenes || ordenes.length === 0) {
            return res.status(404).json(
                { "message": "Ordenes no encontradas"}
            )
        }
        res.status(200).json(ordenes);

    }
    save = async (req: Request<any, any, CreateOrdenBody, any>, res: Response) => {
        const userId: string = req.body.userId;

        const data: CreateOrdenBody = req.body;
        const orden: OrdenResponseDTO = await this.createOrden.execute(userId, data);

        if (!orden) {
            res.status(400).json(
                { "message": "No se pudo crear la orden" }
            )
        }
        res.status(201).json(orden);
    }
}

