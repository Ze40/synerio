import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  firstName: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  lastName: string;

  @IsEmail(
    {},
    { message: 'Поле email должно быть корректным адресом электронной почты' },
  )
  email: string;

  @IsBoolean({ message: 'IsTwoFactorEnabled должно быть булевским типом' })
  isTwoFactorEnabled: boolean;
}
