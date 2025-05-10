import { Module } from '@nestjs/common';

import { SessionService } from '@/auth/provider/services/session.service';
import { MailModule } from '@/mail/mail.module';
import { MailService } from '@/mail/mail.service';
import { UserService } from '@/user/user.service';

import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
  imports: [MailModule],
  controllers: [EmailConfirmationController],
  providers: [
    EmailConfirmationService,
    UserService,
    SessionService,
    MailService,
  ],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
