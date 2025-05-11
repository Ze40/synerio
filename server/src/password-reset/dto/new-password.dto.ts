import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewPasswordDto {
  @IsNotEmpty({ message: 'Поле пароль обязательно' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Длина пароля не менее 6 символов' })
  password: string;
}
