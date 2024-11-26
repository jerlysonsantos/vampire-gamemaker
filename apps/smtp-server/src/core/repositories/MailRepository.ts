import { Mail } from "../entities/Mail";

export interface MailRepository {
    save(mail: Mail): void;
    findByTo(to: string): Mail[];
    findByFrom(from: string): Promise<Mail[]>;
}