import { IsEmail, IsString } from 'class-validator';

export class PostLoginUserDto {
  @IsString()
  token: string;
}
