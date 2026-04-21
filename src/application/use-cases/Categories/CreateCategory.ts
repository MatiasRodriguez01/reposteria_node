import { Category } from "../../../domain/entities/Products/Category";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

export class CreateCategory {
    constructor(private repository: CategoryRepository) {}

    async execute(name: string) {
        const newCategory: Category = await this.repository.save(name);
        return newCategory;
    }
}