import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserRole } from 'prisma/__generated__';

import { Authorization, Authorized } from '@/auth/decorators';

import { UpdateUserDto } from './dto';
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

  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  public async updateProfile(
    @Authorized('id') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(userId, dto);
  }
}
