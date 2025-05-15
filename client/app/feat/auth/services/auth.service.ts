import { api } from "@/api";

import type { IUser, TypeLoginSchema, TypeRegisterSchema } from "../schemes";

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
}

export const authService = new AuthService();
