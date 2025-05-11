import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { NewPasswordDto, ResetPaswwordDto } from './dto';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Recaptcha()
  public async reset(@Body() dto: ResetPaswwordDto) {
    return this.passwordResetService.reset(dto);
  }

  @Post('new/:token')
  @HttpCode(HttpStatus.OK)
  @Recaptcha()
  public async new(@Body() dto: NewPasswordDto, @Param('token') token: string) {
    return this.passwordResetService.newPassword(dto, token);
  }
}
