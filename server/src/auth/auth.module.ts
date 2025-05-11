import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';

import { getProvidersConfig, getRecaptchaConfig } from '@/config';
import { EmailConfirmationModule } from '@/email-confirmation/email-confirmation.module';
import { MailService } from '@/mail/mail.service';
import { UserService } from '@/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProviderModule } from './provider/provider.module';
import { SessionService } from './provider/services/session.service';
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service';

@Module({
  imports: [
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getProvidersConfig,
      inject: [ConfigService],
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getRecaptchaConfig,
      inject: [ConfigService],
    }),
    EmailConfirmationModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    MailService,
    SessionService,
    TwoFactorAuthService,
  ],
})
export class AuthModule {}
