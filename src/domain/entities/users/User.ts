import { userRow } from "../../values_objects/UserRow";

export class User{
    constructor(
        readonly id: string,
        readonly username: string,
        readonly password: string,
        readonly email: string,
        readonly phone: string,
        readonly role_id: string | null
    )

    {
        if (!email.includes("@") || !email.includes(".")){
            throw new Error("Email no es valido")
        }
    }
}

export function schema_user(user: userRow): User {
    return new User(user.id, user.username, user.password, user.email, user.phone, user.role_id);
}