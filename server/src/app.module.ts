import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './auth/provider/provider.module';
import { TwoFactorAuthModule } from './auth/two-factor-auth/two-factor-auth.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { IS_DEV_ENV } from './libs/common/utils';
import { MailModule } from './mail/mail.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProviderModule,
    MailModule,
    EmailConfirmationModule,
    PasswordResetModule,
    TwoFactorAuthModule,
  ],
})
export class AppModule {}
