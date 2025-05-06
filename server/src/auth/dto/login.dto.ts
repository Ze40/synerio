import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email обязательное поле.' })
  @IsString({ message: 'Email должен быть строкой.' })
  @IsEmail({}, { message: 'Некоректный формат email.' })
  email: string;

  @IsNotEmpty({ message: 'Email обязательное поле.' })
  @IsString({ message: 'Email должен быть строкой.' })
  @MinLength(6, { message: 'Пароль должен быть не меннее 6 символов' })
  password: string;
}
