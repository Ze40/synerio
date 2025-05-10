import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TypeBaseProviderOptions, TypeUserInfo } from './types';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  expires_at?: number;
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
    const client_id = this.options.client_id;
    const client_secret = this.options.client_secret;

    const tokenQuery = new URLSearchParams({
      client_id,
      client_secret,
      code,
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
    });

    const tokensRequest = await fetch(this.options.access_url, {
      method: 'POST',
      body: tokenQuery,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    if (!tokensRequest.ok) {
      throw new BadRequestException(
        `Не удалось получить токены с ${this.options.access_url}.`,
      );
    }

    const tokens = (await tokensRequest.json()) as TokenResponse;

    if (!tokens.access_token) {
      throw new BadRequestException(
        `Нет access_token в ответе от ${this.options.access_url}.`,
      );
    }

    const userRequest = await fetch(this.options.profile_url, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userRequest.ok) {
      throw new UnauthorizedException(
        `Не удалось получить профиль с ${this.options.profile_url}.`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await userRequest.json();
    const userData = this.extractUserInfo(user);

    if (!userData.email) {
      throw new UnauthorizedException('Недостаточно данных о пользователе');
    }

    return {
      ...userData,
      provider: this.options.name,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: this.calculateExpiresAt(tokens),
    };
  }

  private calculateExpiresAt(tokens: TokenResponse): number | undefined {
    const expiresIn = parseInt(tokens.expires_in?.toString(), 10);
    if (!isNaN(expiresIn)) {
      return Math.floor(Date.now() / 1000) + expiresIn;
    }
    return tokens.expires_at ?? undefined;
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
