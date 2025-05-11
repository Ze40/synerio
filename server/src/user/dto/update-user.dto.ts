import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  name: string;

  @IsEmail(
    {},
    { message: 'Поле email должно быть корректным адресом электронной почты' },
  )
  email: string;

  @IsBoolean({ message: 'IsTwoFactorEnabled должно быть булевским типом' })
  isTwoFactorEnabled: boolean;
}
