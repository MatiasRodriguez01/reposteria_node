import { User } from "../../../domain/entities/users/User"
import { type UserRepository } from "../../../domain/repositories/UserRepository"
import { HashService } from "../../../domain/services/HashService";
import { CreateUserBody } from "../../dto/request/body/CreateUserBody";


export class CreateUser {
    constructor(
        private userRepo: UserRepository,
        private hashService: HashService
    ) {}

    async execute(user: CreateUserBody): Promise<User> {
        const hashedPassword = await this.hashService.hash(user.password);
        const new_user = new User(
            crypto.randomUUID(), 
            user.username, 
            hashedPassword, 
            user.email, 
            user.phone, 
            null
        )
        
        const payload = await this.userRepo.save(new_user) as User
        return payload;
    }
}