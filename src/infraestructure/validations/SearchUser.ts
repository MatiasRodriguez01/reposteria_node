import { Request, Response, NextFunction } from "express";
import { pool } from "../db/postgress_db";

export function searchUserById(req: Request<{}, {}, {}, { userId: string }>, res: Response, next: NextFunction) {
    const userId = req.query.userId;

    const user = pool.query(
        'SELECT id FROM users WHERE id = $1',
        [userId]
    );

    if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    };

    next();
}