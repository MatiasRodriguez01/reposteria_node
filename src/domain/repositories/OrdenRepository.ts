import { CreateOrdenDTO } from "../../application/dto/request/body/CreateOrdenBody";
import { OrdenResponseDTO } from "../../application/dto/responses/OrdenResponseDTO";
import { Orden } from "../entities/Ordens/Orden";

export interface OrdenRepository {
    findById(id: string): Promise<OrdenResponseDTO>;
    findByUserId(userId: String): Promise<OrdenResponseDTO[]>;
    findByUserDate(userId: string, data: string): Promise<OrdenResponseDTO[]>
    save(userId: string, orden: CreateOrdenDTO): Promise<OrdenResponseDTO>;
}