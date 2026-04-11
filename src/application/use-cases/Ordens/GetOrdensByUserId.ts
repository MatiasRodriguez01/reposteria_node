import { Orden } from "../../../domain/entities/Ordens/Orden";
import { OrdenRepository } from "../../../domain/repositories/OrdenRepository";
import { OrdenResponseDTO } from "../../dto/responses/OrdenResponseDTO";

export class GetOrdensByUserId {
    constructor(private repo: OrdenRepository){}

    async execute(userId: string): Promise<OrdenResponseDTO[]> {
        const ordenes: OrdenResponseDTO [] = await this.repo.findByUserId(userId);
        return ordenes;
    }
}