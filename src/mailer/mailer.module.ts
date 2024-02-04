import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailService } from './mailer.service';

@Module({
  imports:[
    MailerModule.forRoot({
        transport:{
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth:{
                user: process.env.SENDGRID_USER,
                pass: process.env.SENDGRID_API_KEY
            },
            connectionTimeout: 1000,
            debug: true,
            logger: true
        },
        defaults: {
            from: '<donotreply@myapp.com>'
        },
        template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter,
            options: {
                strict: true
            }
        }
    })
],
  providers: [MailService],
})
export class MailModule {}
