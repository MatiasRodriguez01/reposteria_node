import { User } from "../entities/users/User"

export interface UserRepository {
    findById(id: string): Promise<User>;
    findAll(): Promise<User[] | []>;
    save(user: User): Promise<User>;
    update(id: string, item: string, value: string): Promise<User>
}