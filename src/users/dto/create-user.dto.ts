/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, Validate, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { UniqueValidator } from 'src/auth/decorator/unique_user';


export class CreateUserDto {
  
  @IsNotEmpty({ message: 'Name should not empty' })
  name: string;

  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email should not empty' })
  @Validate(UniqueValidator, ['email'], {
          message: 'emailAlreadyExists',
  })
  email: string;

  @IsNotEmpty({ message: 'Password should not empty' })
  password: string;

  @IsNotEmpty({ message: 'Age should not empty' })
  age: number;

  @IsNotEmpty({ message: 'Gender should not empty' })
  gender: string;

  @IsNotEmpty({ message: 'Address should not empty' })
  address: string;

}

export class RegisterUserDto {
  
  @IsNotEmpty({ message: 'Name should not empty' })
  name: string;

  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email should not empty' })
  @Validate(UniqueValidator, ['email'], {
          message: 'email already exists',
  })
  email: string;

  @IsNotEmpty({ message: 'Password should not empty' })
  password: string;

  @IsNotEmpty({ message: 'Age should not empty' })
  age: number;

  @IsNotEmpty({ message: 'Gender should not empty' })
  gender: string;

  @IsNotEmpty({ message: 'Address should not empty' })
  address: string;

}
