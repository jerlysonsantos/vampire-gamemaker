import { Mail } from "../entities/Mail";
import { MailRepository } from "../repositories/MailRepository";

export interface MailUseCase {
    mailRepository: MailRepository;
    sendMail(from: string, to: string[], data: string): void;
    listMails(to: string): Mail;
    listMailsFrom(from: string): Promise<Mail>;
}