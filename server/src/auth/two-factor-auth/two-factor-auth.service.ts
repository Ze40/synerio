import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenType } from 'prisma/__generated__';

import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TwoFactorAuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  public async validateTwoFactorToken(email: string, code: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email: email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (!existingToken) {
      throw new NotFoundException('Токен подтверждения не найден');
    }

    if (existingToken.token !== code) {
      throw new BadRequestException('Неверный код');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestException(
        'Токен подтверждения истек, запросите новый',
      );
    }

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.TWO_FACTOR,
      },
    });

    return true;
  }

  public async sendTwoFactorToken(email: string) {
    const twoFactorToken = await this.generateTwoFactorToken(email);

    await this.mailService.sendTwoFactorEmail(
      twoFactorToken.email,
      twoFactorToken.token,
    );

    return true;
  }

  private async generateTwoFactorToken(email: string) {
    const token = Math.floor(
      Math.random() * (1_000_000 - 100_000) + 100_000,
    ).toString();
    const expiresIn = new Date(new Date().getTime() + 300_000);

    const twoFactorToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    });

    if (twoFactorToken) {
      await this.prismaService.token.delete({
        where: {
          id: twoFactorToken.id,
          type: TokenType.TWO_FACTOR,
        },
      });
    }

    const verificationToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.TWO_FACTOR,
      },
    });
    return verificationToken;
  }
}
