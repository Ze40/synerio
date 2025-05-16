import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { Prisma } from 'prisma/__generated__';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto, UpdateUserDto } from './dto';

type UserWithAccounts = Prisma.UserGetPayload<{
  include: { accounts: true };
}>;

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string): Promise<UserWithAccounts> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });
    if (!user) {
      throw new NotFoundException(
        'Пользователь не найден. Проверьте введенные данные',
      );
    }
    return user;
  }

  public async findByEmail(email: string): Promise<UserWithAccounts | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  public async create(newUser: CreateUserDto): Promise<UserWithAccounts> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...newUser,
          password: newUser.password ? await hash(newUser.password) : '',
        },
        include: {
          accounts: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new ConflictException('Такой пользователь уже существует');
    }
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: dto.email,
        displayName: dto.name,
        isTwoFactorEnabled: dto.isTwoFactorEnabled,
      },
    });

    return updatedUser;
  }
}
