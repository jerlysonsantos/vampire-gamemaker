import { Mail } from "../entities/Mail";
import { MailRepository } from "../repositories/MailRepository";

export interface MailUseCase {
    mailRepository: MailRepository;
    sendMail(from: string, recipient: string, data: string): Promise<void>;
    listMailsFrom(from: string): Promise<Mail>;
}