import { Orden } from "../../../domain/entities/Ordens/Orden";
import { OrdenRepository } from "../../../domain/repositories/OrdenRepository";
import { OrdenResponseDTO } from "../../dto/responses/OrdenResponseDTO";

export class GetOrdenById {
    constructor(private repo: OrdenRepository){}

    async execute(id: string): Promise<OrdenResponseDTO> {
        const orden: OrdenResponseDTO = await this.repo.findById(id);
        return orden;
    }
}