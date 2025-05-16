import { api } from "@/api";
import type { IUser } from "@/entities/user/types";

class UserService {
  public async getProfile() {
    const response = await api.get<IUser>("users/profile");
    return response;
  }
}

export const userService = new UserService();
