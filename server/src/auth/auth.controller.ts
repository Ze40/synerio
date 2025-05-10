import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Recaptcha()
  @HttpCode(HttpStatus.OK)
  public async register(@Req() req: Request, @Body() dto: RegisterDto) {
    return this.authService.register(req, dto);
  }

  @Post('login')
  @Recaptcha()
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Body() dto: LoginDto) {
    return this.authService.login(req, dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }
}
