import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserRole } from 'prisma/__generated__';

import { Authorization, Authorized } from '@/auth/decorators';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  public async findProfile(@Authorized('id') userId: string) {
    return this.userService.findById(userId);
  }

  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  @Authorization(UserRole.ADMIN)
  public async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
