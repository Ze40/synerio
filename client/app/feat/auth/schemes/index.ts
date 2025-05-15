import type { TypeLoginSchema } from "./login";
import type { TypeRegisterSchema } from "./register";

export type { IUser, IAccount, AuthMethod, UserRole } from "./user"; //Знатно прифигел что это работает ведь написал случайно export вместо import

export type { TypeLoginSchema, TypeRegisterSchema };
