import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import { Request, Response } from 'express';
import { AuthMethod } from 'prisma/__generated__';

import { EmailConfirmationService } from '@/email-confirmation/email-confirmation.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

import { LoginDto, RegisterDto } from './dto';
import { ProviderService } from './provider/provider.service';
import { SessionService } from './provider/services/session.service';
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly sessionService: SessionService,
    private readonly twoFactorService: TwoFactorAuthService,
  ) {}

  public async register(req: Request, dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException(
        'Регистрация не удалась. Пользователь с таким email уже существует',
      );
    }

    const newUser = await this.userService.create({
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      picture: '',
      method: AuthMethod.CREDENTIALS,
      isVerified: false,
    });

    await this.emailConfirmationService.sendVerificationToken(newUser.email);

    return {
      message: 'Регистрация произошла успешно, подтвердите свой email',
    };
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !user.password) {
      throw new NotFoundException(
        'Пользователь не найден. Проверьте введенные данные',
      );
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    if (!user.isVerified) {
      await this.emailConfirmationService.sendVerificationToken(user.email);
      throw new UnauthorizedException('Ваша почта не была подтверждена');
    }

    if (user.isTwoFactorEnabled) {
      if (!dto.code) {
        await this.twoFactorService.sendTwoFactorToken(user.email);

        return {
          message:
            'Проверьте вашу почту. Требуется код для двухфакторной аутентификации',
        };
      }

      await this.twoFactorService.validateTwoFactorToken(user.email, dto.code);
    }

    return this.sessionService.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException('Не удалось завершить сессию'),
          );
        }
        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
  }

  public async extractProfileFromCode(
    req: Request,
    provider: string,
    code: string,
  ) {
    const providerInstance = this.providerService.findByService(provider);
    const profile = await providerInstance?.findUserByCode(code);
    if (!profile) {
      throw new UnauthorizedException('Такой профиль не найден');
    }

    const account = await this.prismaService.account.findFirst({
      where: {
        id: profile.id,
        provider: profile.provider,
      },
    });

    let user = account?.userId
      ? await this.userService.findById(account.userId)
      : null;

    if (user) {
      return this.sessionService.saveSession(req, user);
    }

    user = await this.userService.create({
      email: profile.email,
      password: '',
      firstName: profile.firstName,
      lastName: profile.lastName,
      picture: profile.picture,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      method: AuthMethod[profile.provider.toUpperCase()],
      isVerified: true,
    });
    if (!account) {
      await this.prismaService.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: profile.provider,
          accessToken: profile.access_token,
          refreshToken: profile.refresh_token,
          expiresAt: profile.expires_at,
        },
      });
    }
    return this.sessionService.saveSession(req, user);
  }
}
