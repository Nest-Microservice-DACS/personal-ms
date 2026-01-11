import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { PersonalStatus } from 'generated/prisma/client';

export class CreatePersonalDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  status: PersonalStatus = PersonalStatus.ACTIVE;
}