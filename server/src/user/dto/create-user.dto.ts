import { AuthMethod } from 'prisma/__generated__';

export class CreateUserDto {
  email: string;
  password: string;
  displayName: string;
  picture: string;
  method: AuthMethod;
  isVerified: boolean;
}
