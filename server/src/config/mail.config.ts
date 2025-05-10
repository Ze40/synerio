import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { isDev } from '@/libs/common/utils';

export const getMailConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('SMTP_HOST'),
    port: parseInt(configService.getOrThrow<string>('SMTP_PORT'), 10),
    secure: !isDev(configService),
    auth: {
      user: configService.getOrThrow<string>('SMTP_USER'),
      pass: configService.getOrThrow<string>('SMTP_PASSWORD'),
    },
  },
  defaults: {
    from: `Synerio ${configService.getOrThrow<string>('SMTP_USER')}`,
  },
});
