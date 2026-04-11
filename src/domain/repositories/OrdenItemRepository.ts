import { OrdenItem } from "../entities/Ordens/OrdenItem";

export interface OrdenItemRepository {
    findById(id: string): Promise<OrdenItem>;
    findByOrderId(orderId: string): Promise<OrdenItem[]>;
    save(item: OrdenItem): Promise<OrdenItem>;
    update(id: string, item: OrdenItem): Promise<OrdenItem>;
    delete(id: string): Promise<void>;
}