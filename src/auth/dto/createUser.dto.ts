import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  // これをつけることで、string以外でリクエストがきたらそもそもエラーにできる。
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  icon: string;

  @IsString()
  iconColor: string;
}
