import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TypeBaseProviderOptions, TypeUserInfo } from './types';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  [key: string]: unknown;
}

@Injectable()
export class BaseOAuthService {
  private BASE_URL: string;

  constructor(private readonly options: TypeBaseProviderOptions) {}

  protected extractUserInfo(data: any): TypeUserInfo {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      ...data,
      provider: this.options.name,
    };
  }

  public getAuthUrl(): string {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: this.options.client_id,
      redirect_uri: this.getRedirectUrl(),
      scope: (this.options.scopes ?? []).join(' '),
      access_type: 'offline',
      prompt: 'select_account',
    });

    return `${this.options.authorize_url}?${query.toString()}`;
  }

  public async findUserByCode(code: string): Promise<TypeUserInfo> {
    if (!code) {
      throw new BadRequestException('Требуется код авторизации');
    }

    const tokenQuery = new URLSearchParams({
      code,
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
    });

    try {
      const tokenRequest = await fetch(this.options.access_url, {
        method: 'POST',
        body: tokenQuery,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      });

      const tokenResponse = (await tokenRequest.json()) as TokenResponse;

      if (!tokenRequest.ok) {
        throw new BadRequestException(
          `Ошибка при получении токена от ${this.options.access_url}`,
        );
      }

      if (!tokenResponse.access_token) {
        throw new BadRequestException(
          `Не получен токен от ${this.options.access_url}`,
        );
      }

      const userRequest = await fetch(this.options.profile_url, {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
          Accept: 'application/json',
        },
      });

      if (!userRequest.ok) {
        throw new UnauthorizedException(
          `Ошибка при получении данных пользователя от ${this.options.profile_url}`,
        );
      }

      const user = (await userRequest.json()) as TypeUserInfo;
      const userData = this.extractUserInfo(user);

      return {
        ...userData,
        access_token: tokenResponse.access_token,
        refresh_token: tokenResponse.refresh_token,
        expires_at: tokenResponse.expires_at,
        provider: this.options.name,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new BadRequestException('Ошибка аутентификации через OAuth');
    }
  }

  public getRedirectUrl(): string {
    if (!this.BASE_URL) {
      throw new Error('Базовый URL не установлен');
    }
    return `${this.BASE_URL}/auth/oauth/callback/${this.options.name}`;
  }

  set baseUrl(value: string) {
    this.BASE_URL = value;
  }

  get name(): string {
    return this.options.name;
  }

  get access_url(): string {
    return this.options.access_url;
  }

  get profile_url(): string {
    return this.options.profile_url;
  }

  get scopes(): string[] {
    return this.options.scopes ?? [];
  }
}
