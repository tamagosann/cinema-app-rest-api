import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UPdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  iconColor: string;
}
