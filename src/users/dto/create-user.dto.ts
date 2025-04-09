/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email should not empty' })
  email: string;

  @IsNotEmpty({ message: 'Password should not empty' })
  password: string;
}
