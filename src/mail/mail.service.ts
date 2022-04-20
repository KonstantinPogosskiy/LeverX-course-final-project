import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {
  }

  async sendMessage(email, message) {
    await this.mailerService.sendMail({
      to: email,
      from: "pogosskiykonstantin@gmail.com",
      subject: 'Testing Nest MailerModule ✔',
      html: `<b>${message}</b>`,
    });
  }
}
