import { User } from "../../../domain/entities/users/User"

export interface UserResponseDTO {
    id: string
    username: string
    email: string
    phone: string
}

export function toUserResponseDTO(user: User): UserResponseDTO {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone
    }
}

export function toUsersResponseDTO(users: User[]): UserResponseDTO[] {
    return users.map((user) => toUserResponseDTO(user))
}