import { RoleUser } from "../entities/users/RoleUser";

export interface RoleUserRepository {
    findId(name: string): Promise<string>;
    findById(id: string): Promise<RoleUser>;
    findAll(): Promise<RoleUser[]>;
    save(roleUser: RoleUser): Promise<RoleUser>;
}