import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export interface UserUseCase {
    userRepository: UserRepository;
    getUserByEmail(email: string): Promise<User>;
    getUsersLike(attr: string): Promise<User[]>;
}