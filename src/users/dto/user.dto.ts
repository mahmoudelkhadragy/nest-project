import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(['admin', 'user', 'customer'], { message: 'Valid role is required' })
  role: 'admin' | 'user' | 'customer';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
