import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { SentMessageInfo } from 'nodemailer';

import {
  ConfirmationTemplate,
  ResetPasswordTemplate,
  TwoFactorTemplate,
} from './templates';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendConfirmationEmail(
    email: string,
    token: string,
  ): Promise<SentMessageInfo> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
    const html = await render(ConfirmationTemplate({ domain, token }));

    return this.sendMail(email, 'Подтверждение почты', html);
  }

  public async sendPasswordEmail(
    email: string,
    token: string,
  ): Promise<SentMessageInfo> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
    const html = await render(ResetPasswordTemplate({ domain, token }));

    return this.sendMail(email, 'Сброс пароля', html);
  }

  public async sendTwoFactorEmail(
    email: string,
    token: string,
  ): Promise<SentMessageInfo> {
    const html = await render(TwoFactorTemplate({ token }));

    return this.sendMail(email, 'Подтверждение личности', html);
  }

  private sendMail(
    email: string,
    subject: string,
    html: string,
  ): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({ to: email, subject, html });
  }
}
