import { MailRepository } from "../../core/repositories/MailRepository";
import { MailUseCase } from "../../core/usecases/MailUseCase";
import { MailRepositoryImpl } from "../repositories/MailRepositoryImpl";
import { Mail } from "../../core/entities/Mail";

export class MailService implements MailUseCase {
    mailRepository: MailRepository;

    constructor() {
        this.mailRepository = new MailRepositoryImpl();
    }

    sendMail(from: string, to: string[], data: string): void {
        const dataMatch = data.match(/(Subject:|SUBJECT:|subject:)(.*)/);
        const subject = dataMatch ? dataMatch[1] : 'No subject';

        to.forEach((recipient) => {
            const mail = new Mail(from, recipient, subject, data);
            this.mailRepository.save(mail);
        })
    }

    listMails(to: string): Mail {
        throw new Error("Method not implemented.");
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