import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';

import { isDev } from '@/libs/common/utils';

export const getRecaptchaConfig = (
  configService: ConfigService,
): GoogleRecaptchaModuleOptions => ({
  secretKey: configService.getOrThrow<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  response: (req) => req.headers.recaptcha,
  skipIf: isDev(configService),
});
