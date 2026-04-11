import { OrdenRepository } from "../../../domain/repositories/OrdenRepository";
import { CreateOrdenBody } from "../../dto/request/body/CreateOrdenBody";
import { OrdenResponseDTO } from "../../dto/responses/OrdenResponseDTO";

export class CreateOrden {
    constructor(private repo: OrdenRepository) { }
    
        async execute(userId: string, newOrden: CreateOrdenBody): Promise<OrdenResponseDTO> {
            const orden: OrdenResponseDTO = await this.repo.save(userId, newOrden);
            return orden;
        }
}