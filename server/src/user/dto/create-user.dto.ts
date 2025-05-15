import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';
import { AuthMethod } from 'prisma/__generated__';

export class CreateUserDto {
  @IsEmail(
    {},
    { message: 'Поле email должно быть корректным адресом электронной почты' },
  )
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string;

  @IsString({ message: 'Имя пользователя должно быть строкой' })
  displayName: string;

  @IsString({ message: 'URL изображения должен быть строкой' })
  picture: string;

  @IsEnum(AuthMethod, {
    message: `Метод авторизации должен быть одним из: ${Object.values(AuthMethod).join(', ')}`,
  })
  method: AuthMethod;

  @IsBoolean({
    message:
      'Поле isVerified должно быть логическим значением (true или false)',
  })
  isVerified: boolean;
}
