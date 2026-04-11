import { Request, Response } from "express";
import { GetCategories } from "../../application/use-cases/Categories/GetCategories";
import { CreateCategory } from "../../application/use-cases/Categories/CreateCategory";
import { CreateCategorieBody } from "../../application/dto/request/body/CreateCategorieBody";

export class CategoryController {
    constructor(
        private getCategories: GetCategories,
        private createCategory: CreateCategory) {}

    getAll = async (req: Request, res: Response) => {
        const categories = await this.getCategories.execute();

        if (categories.length === 0) {
            return res.status(404).json({ message: "No encontramos categorias" });
        }

        res.status(200).json(categories);
    }

    create = async (req: Request<any, any, CreateCategorieBody, any>, res: Response) => {
        const name = req.body.name;

        const newCategory = await this.createCategory.execute(name);

        if (!newCategory) {
            return res.status(404).json({ message: "No se Pudo Crear la categoria" });
        }

        res.status(201).json(newCategory);
    }
}