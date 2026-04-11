
import type { User } from "../../../domain/entities/users/User";
import type { UserRepository } from "../../../domain/repositories/UserRepository"

export class GetUserById {
    constructor(private userRepo: UserRepository){}

    async execute(id: string): Promise<User>{
        const user: User = await this.userRepo.findById(id);
        return user;
    }
}