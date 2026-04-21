import { Pool, QueryResult } from "pg";
import { RoleUser } from "../../domain/entities/users/RoleUser";
import { RoleUserRepository } from "../../domain/repositories/RoleUserRepository";

export class RoleUserRepositoryImpl implements RoleUserRepository {
    constructor(private pool: Pool) { }

    async findId(name: string): Promise<string> {
        try {
            const payload: QueryResult<{ id: string }> = await this.pool.query(
                `SELECT id FROM user_role WHERE name = $1`,
                [name]
            )
            const id = payload.rows[0]?.id as string;
            return id;
        } catch (error) {
            throw new Error("PostgresSql no encontro el ID del role de usuario");
        }
    }
    async findById(id: string): Promise<RoleUser> {
        try {
            const payload: QueryResult<RoleUser> = await this.pool.query(
                `SELECT id, name FROM user_role WHERE id = $1`,
                [id]
            )
            const RoleUser = payload.rows[0] as RoleUser;
            return RoleUser;
        } catch (error) {
            throw new Error("PostgresSql no encontro el rol de usuario");
        }
    }
    async findAll(): Promise<RoleUser[]> {
        try {
            const payload: QueryResult<RoleUser> = await this.pool.query(
                `SELECT id, name FROM user_role`
            )
            const RoleUseres: RoleUser[] = payload.rows.map((row) => row as RoleUser);
            return RoleUseres;
        } catch (error) {
            throw new Error("PostgresSql no encontro los roles de usuario");
        }
    }
    async save(RoleUser: RoleUser): Promise<RoleUser> {
        try {
            const payload: QueryResult<RoleUser> = await this.pool.query(
                `INSERT INTO user_role (id, name) VALUES ($1, $2) RETURNING id, name`,
                [RoleUser.id, RoleUser.name]
            )
            const newRoleUser = payload.rows[0] as RoleUser;
            return newRoleUser;
        } catch (error) {
            throw new Error("PostgresSql no guardo el rol de usuario");
        }
    }
}