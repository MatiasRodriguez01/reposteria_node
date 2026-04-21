import { User } from "../../../domain/entities/users/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class UpdateUser {
    constructor(private repo: UserRepository){}

    async execute(id: string, item: string, value: string): Promise<User> {
        const user: User = await this.repo.update(id, item, value);

        return user;
    }
}