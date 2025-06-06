import { api } from "@/api";
import type { IUser } from "@/entities/user/types";

import type { TypeLoginSchema, TypeRegisterSchema } from "../schemes";

class AuthService {
  public async register(body: TypeRegisterSchema, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined;

    const response = await api.post<IUser>("auth/register", body, {
      headers,
    });

    return response;
  }

  public async login(body: TypeLoginSchema, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined;

    const response = await api.post<IUser>("auth/login", body, {
      headers,
    });

    return response;
  }

  public async logout() {
    const response = await api.post("auth/logout");

    return response;
  }

  public async oauthByProvider(privider: "google" | "yandex") {
    const response = await api.get<{ url: string }>(`auth/oauth/connect/${privider}`);
    return response;
  }

  public async confirmEmail(token: string) {
    const response = await api.post<IUser>("auth/email-confirmation", { token: token });
    return response;
  }
}

export const authService = new AuthService();
