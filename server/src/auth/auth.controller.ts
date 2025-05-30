import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { AuthProviderGuard } from './guards';
import { ProviderService } from './provider/provider.service';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly configService: ConfigService,
  ) {}

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

  @Get('/oauth/callback/:provider')
  @UseGuards(AuthProviderGuard)
  public async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Param('provider') provider: string,
  ) {
    if (!code) {
      throw new BadRequestException('Не был предоставлен код для авторизации');
    }

    await this.authService.extractProfileFromCode(req, provider, code);
    return res.redirect(
      `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/feat`,
    );
  }

  @UseGuards(AuthProviderGuard)
  @Get('/oauth/connect/:provider')
  public connect(@Param('provider') provider: string) {
    const providerInstance = this.providerService.findByService(provider);
    return {
      url: providerInstance?.getAuthUrl(),
    };
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
