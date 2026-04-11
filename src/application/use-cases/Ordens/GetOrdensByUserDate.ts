import { Orden } from "../../../domain/entities/Ordens/Orden";
import { OrdenRepository } from "../../../domain/repositories/OrdenRepository";
import { OrdenResponseDTO } from "../../dto/responses/OrdenResponseDTO";

export class GetOrdensByUserDate {
    constructor(private repo: OrdenRepository) { }

    async execute(userId: string, date: string): Promise<OrdenResponseDTO[]> {
        const ordenes: OrdenResponseDTO[] = await this.repo.findByUserDate(userId, date);
        return ordenes;
    }
}