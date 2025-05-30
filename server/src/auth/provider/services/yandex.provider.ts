import { BaseOAuthService } from './base-oauth.service';
import { TypeProviderOptions, TypeUserInfo } from './types';

interface YandexProfile {
  login: string;
  id: string;
  client_id: string;
  psuid: string;
  emails: string[];
  default_email?: string;
  is_avatar_empty?: boolean;
  default_avatar_id?: string;
  birthday?: string | null;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  real_name?: string;
  sex?: 'male' | 'female' | null;
  default_phone?: { id: number; number: string };
  access_token: string;
  refresh_token?: string;
}

export class YandexProvider extends BaseOAuthService {
  public constructor(options: TypeProviderOptions) {
    super({
      name: 'yandex',
      authorize_url: 'https://oauth.yandex.ru/authorize',
      access_url: 'https://oauth.yandex.ru/token',
      profile_url: 'https://login.yandex.ru/info?format=json',
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret,
    });
  }

  public extractUserInfo(data: YandexProfile): TypeUserInfo {
    return super.extractUserInfo({
      email: data.emails[0],
      name: data.display_name,
      picture: data.default_avatar_id
        ? `https://avatars.yandex.net/get-yapic/${data.default_avatar_id}/islands-200`
        : undefined,
    });
  }
}
