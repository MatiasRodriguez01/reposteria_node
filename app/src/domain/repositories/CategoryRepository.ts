import { CategoryResposeDTO } from "../../application/dto/responses/CategoryResponseDTO";
import { Category } from "../entities/Products/Category";


export interface CategoryRepository {
    findAll(): Promise<CategoryResposeDTO[]>;
    save(name: string): Promise<Category>;
}