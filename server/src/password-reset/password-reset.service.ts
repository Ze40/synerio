import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { TokenType } from 'prisma/__generated__';
import { v4 } from 'uuid';

import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

import { NewPasswordDto, ResetPaswwordDto } from './dto';

@Injectable()
export class PasswordResetService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  public async reset(dto: ResetPaswwordDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (!existingUser) {
      throw new NotFoundException('Пользователь с такой почтой не найден');
    }

    const passwordResetToken = await this.generatePasswordResetToken(
      existingUser.email,
    );

    await this.mailService.sendPasswordEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return true;
  }

  public async newPassword(dto: NewPasswordDto, token: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        token: token,
        type: TokenType.PASSWORD_RESET,
      },
    });

    if (!existingToken) {
      throw new NotFoundException('Токен не найден');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestException('Токен сброса истек, запросите новый');
    }

    const existingUser = await this.userService.findByEmail(
      existingToken.email,
    );
    if (!existingUser) {
      throw new NotFoundException('Пользователь с такой почтой не найден');
    }

    await this.prismaService.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: await hash(dto.password),
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.PASSWORD_RESET,
      },
    });

    return true;
  }

  private async generatePasswordResetToken(email: string) {
    const token = v4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.PASSWORD_RESET,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.PASSWORD_RESET,
        },
      });
    }

    const passwordResetToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.PASSWORD_RESET,
      },
    });
    return passwordResetToken;
  }
}
