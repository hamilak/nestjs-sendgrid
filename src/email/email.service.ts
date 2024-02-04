import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail'

@Injectable()
export class EmailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    }

    // Using sendgrid mail library to send emails with dynamic templates

    async sendEmailWithTemplate(to: string, templateId: string, dynamicTemplateData: Record<string, string>): Promise<void> {
        const msg = {
            to,
            from: 'donotreply@myapp.com',
            templateId,
            dynamic_template_data: dynamicTemplateData
        }
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error('Error sending email:', error);
            if (error.response) {
                console.error('SendGrid response:', error.response.body);
            }
        }
    }
}
