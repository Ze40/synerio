import { Module } from '@nestjs/common';

import { MailService } from '@/mail/mail.service';
import { UserService } from '@/user/user.service';

import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  controllers: [PasswordResetController],
  providers: [PasswordResetService, UserService, MailService],
})
export class PasswordResetModule {}
