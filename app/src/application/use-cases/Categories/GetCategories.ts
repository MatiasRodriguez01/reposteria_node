import { Category } from "../../../domain/entities/Products/Category";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";
import { CategoryResposeDTO } from "../../dto/responses/CategoryResponseDTO";

export class GetCategories {
    constructor(private repository: CategoryRepository) {}

    async execute(): Promise<CategoryResposeDTO[]> {
        return await this.repository.findAll();
    }
}