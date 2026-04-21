import type { User } from "../../../domain/entities/users/User";
import type { UserRepository } from "../../../domain/repositories/UserRepository";

export class GetUsers {
    constructor(private userRepo: UserRepository){}

    async execute(): Promise<User[]> {
        return  await this.userRepo.findAll();
    }
}