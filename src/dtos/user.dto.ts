import { UserResponse } from "../interfaces/user";
import User from "../models/user.model";

export function UserResponseDTO(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    patronymic: user.patronymic,
  };
}
