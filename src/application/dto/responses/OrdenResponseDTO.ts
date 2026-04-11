import { Orden } from "../../../domain/entities/Ordens/Orden";

export interface OrdenResponseDTO {
    id: string;
    total_price: number,
    status: string,
    created_at: string,
    payment_method: string
}
