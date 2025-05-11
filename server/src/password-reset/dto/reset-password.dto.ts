import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPaswwordDto {
  @IsEmail({}, { message: 'Не коректный email' })
  @IsNotEmpty({ message: 'Почта является обязательным полем' })
  email: string;
}
