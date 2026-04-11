import { Producto } from "../entities/Products/Product";

export interface productoRepository {
    findById(id: string): Promise<Producto>;
    findAll(): Promise<Producto[]>;
    findAllByUserId(userId: string): Promise<Producto[]>;
    save(producto: Producto): Promise<Producto>;
    update(id: string, item: string, value: string): Promise<Producto>
}