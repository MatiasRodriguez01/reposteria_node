import { CreateCategory } from "../../application/use-cases/Categories/CreateCategory";
import { GetCategories } from "../../application/use-cases/Categories/GetCategories";
import { pool } from "../db/postgress_db";
import { CategoryController } from "../http/CategoryController";
import { CategoryRepositoryImpl } from "../repositories/CategoryRepositoryImpl";

const repositorie = new CategoryRepositoryImpl(pool);

const create_categorie = new CreateCategory(repositorie);
const get_categories = new GetCategories(repositorie);

export const category_controller = new CategoryController(get_categories, create_categorie);