import { MailRepository } from "../../core/repositories/MailRepository";
import { MailUseCase } from "../../core/usecases/MailUseCase";
import { MailRepositoryImpl } from "../repositories/MailRepositoryImpl";
import { Mail } from "../../core/entities/Mail";

export class MailService implements MailUseCase {
    mailRepository: MailRepository;

    constructor() {
        this.mailRepository = new MailRepositoryImpl();
    }

    async sendMail(from: string, recipient: string, data: string): Promise<void> {
        const regex = /(Subject:|SUBJECT:|subject:)(.*)/
        const dataMatch = data.match(regex);

        const subject = dataMatch ? dataMatch[2].trim() : 'No subject';
        const cleanData = data.replace(regex, '');

        const mail = new Mail(from, recipient, subject, cleanData);
        await this.mailRepository.save(mail);
    }

    async listMailsFrom(from: string): Promise<Mail> {
        const mails = await this.mailRepository.findByFrom(from);

        if (mails.length === 0) {
            throw new Error('550 mailbox not found');
        }

        if (mails.length > 1) {
            throw new Error('553 User ambiguous');
        }

        return mails[0]
    }
}