
import { UserUseCase } from "../../core/usecases/UserUseCase";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { User } from "../../core/entities/User";

export class UserService implements UserUseCase {
    userRepository: UserRepositoryImpl;

    constructor() {
        this.userRepository = new UserRepositoryImpl();
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('550 User not found');
        }

        return user
    }

    async getUsersLike(attr: string): Promise<User[]> {
        const users = await this.userRepository.findLike(attr);

        console.log(users);
        if (users.length === 0) {
            throw new Error('550 User not found');
        }

        if (users.length > 10) {
            throw new Error('550 Too many users found');
        }

        return users
    }
}