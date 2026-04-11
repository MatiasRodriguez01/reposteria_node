import { User } from "../../../domain/entities/users/User"
import { type UserRepository } from "../../../domain/repositories/UserRepository"
import { CreateUserBody } from "../../dto/request/body/CreateUserBody";


export class CreateUser {
    constructor(private userRepo: UserRepository) {}

    async execute(user: CreateUserBody): Promise<User> {

        const new_user = new User(crypto.randomUUID(), user.username, user.password, user.email, user.phone, null)
        
        const payload = await this.userRepo.save(new_user) as User
        return payload;
    }
}