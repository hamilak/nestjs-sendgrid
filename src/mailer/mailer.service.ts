import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ){}

    // Connecting to sendgrid using nestjs mailer

    async sendEmail(email: string, name: string){
        await this.mailerService.sendMail({
            to: email,
            subject: 'Verification Email',
            template: './verificationEmail',
            // context contains your dynamic data
            context: {
                name: name
            }
        })
    }
}
