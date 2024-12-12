import { User } from "../entities/User";

export interface UserRepository {
    findByEmail(email: string): Promise<User>;
    findLike(attr: string): Promise<User[]>;
}