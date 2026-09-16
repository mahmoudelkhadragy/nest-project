import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string value' })
  @IsNotEmpty()
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  firstName: string;

  @IsString({ message: 'Last name must be a string value' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
