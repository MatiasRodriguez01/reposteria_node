import { Pool, type QueryResult, QueryResultRow } from "pg"
import { type UserRepository } from "../../domain/repositories/UserRepository"
import { User, schema_user } from "../../domain/entities/users/User"
import { userRow } from "../../domain/values_objects/UserRow";

export class UserRepositoryImpl implements UserRepository {
    constructor(private pool: Pool) { }

    async findById(id: string): Promise<User> {
        try {
            const payload: QueryResult<userRow> = await this.pool.query<userRow>(
                "SELECT id, username, password, email, phone FROM users WHERE id = $1",
                [id]
            );

            const row = payload.rows[0] as userRow;
            return schema_user(row);
        } catch (error) {
            throw new Error("PostgresSQL no devolvio el usuario (ID)")
        }
    }
    
    async findAll(): Promise<User[]> {
        
            const users_db: QueryResult<userRow> = await this.pool.query<userRow>(
                "SELECT id, username, password, email, phone FROM users"
            )

            const users: User[] = users_db.rows.map(
                (row) => schema_user(row)
            );
            
            return users
    }

    async save(user: User): Promise<User> {
        //try {
        const payload_role_id: QueryResult<{ id: string }> = await this.pool.query(
            "SELECT id FROM role_user WHERE name = $1",
            ["cliente"]
        );
        const id = payload_role_id.rows[0]?.id as string;
        console.log("ID: ", id);

        const payload: QueryResult<userRow> = await this.pool.query(
            `INSERT INTO users (id, username, password, email, phone, role_id) VALUES 
             ($1, $2, $3, $4, $5, $6) 
             RETURNING id, username, password, email, phone`,
            [user.id, user.username, user.password, user.email, user.phone, id]
        );

        if (payload.rowCount === 0) {
            throw new Error("No se pudo crear el usuario");
        }

        const row = payload.rows[0] as userRow;
        return schema_user(row);
    }

    async update(idUser: string, item: string, value: string): Promise<User> {
        const payload: QueryResult<userRow> = await this.pool.query(
            `UPDATE users SET ${item} = $1 WHERE id = $2 RETURNING *`,
            [value, idUser]
        );

        if (payload.rowCount === 0) {
            throw new Error("Method not implemented.");
        }

        const row = payload.rows[0] as userRow;
        return schema_user(row);
    }
}