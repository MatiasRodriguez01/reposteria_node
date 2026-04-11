import { Request, Response, NextFunction } from 'express';
import { CreateOrdenBody } from '../../application/dto/request/body/CreateOrdenBody';


const VALID_PAYMENT_METHODS = [
    'transferencia',
    'efectivo',
    'tarjeta',
    'BNA',
    'mercado_pago'
];

const VALID_CATEGORIES = [
    'torta',
    'tarta',
    'mesa_dulce',
    'desayuno',
    'alfajor',
    'otros'
];

export const validateOrderRequest = async (
    req: Request<any, any, CreateOrdenBody, any>, 
    res: Response, 
    next: NextFunction): Promise<void> => {
    const orden = req.body;
    const errors: string[] = [];

    if (!orden.userId) errors.push('userId es obligatorio');
    if (!orden.name) errors.push('name es obligatorio');
    if (!orden.description) errors.push('description es obligatorio');

    if (orden.price <= 0) errors.push('price debe ser mayor a 0');
    if (orden.quantity <= 0) errors.push('quantity debe ser mayor a 0');

    if (!VALID_PAYMENT_METHODS.includes(orden.paymentMethod)) {
        errors.push(`paymentMethod inválido. Valores permitidos: ${VALID_PAYMENT_METHODS.join(', ')}`);
    }

    if (!VALID_CATEGORIES.includes(orden.category)) {
        errors.push(`category inválida. Valores permitidos: ${VALID_CATEGORIES.join(', ')}`);
    }

    if (errors.length > 0) {
        res.status(400).json({
            "Errores de validación": `${errors.join('; ')}`
        });
        return;
    }

    next();
}
