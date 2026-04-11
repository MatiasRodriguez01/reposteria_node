import { Pool, QueryResult } from "pg";
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { Category } from "../../domain/entities/Products/Category";
import { CategoryResposeDTO } from "../../application/dto/responses/CategoryResponseDTO";

export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private pool: Pool) { }

    async findAll(): Promise<CategoryResposeDTO[]> {
        try {
            const payload: QueryResult<CategoryResposeDTO> = await this.pool.query(
                `SELECT name FROM categories`
            )
            const ProductCategories: CategoryResposeDTO[] = payload.rows.map((row) => row as CategoryResposeDTO);
            return ProductCategories;
        } catch (error) {
            throw new Error("PostgresSql no encontro el metodo de pago");
        }
    }

    async save(name: string): Promise<Category> {
        try {
            const id = crypto.randomUUID();
            const payload: QueryResult<Category> = await this.pool.query(
                `INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING id, name`,
                [id, name]
            )
            const newProductCategorie = payload.rows[0] as Category;
            return newProductCategorie;
        } catch (error) {
            throw new Error("PostgresSql no encontro el metodo de pago");
        }
    }
}