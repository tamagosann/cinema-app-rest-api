import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body()
    { username, email, password, icon, iconColor }: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signUp(
      username,
      email,
      password,
      icon,
      iconColor,
    );
    session.userId = user.userId;
    return user;
  }

  @Post('/login')
  async logIn(
    @Body() { email, password }: LoginUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.logIn(email, password);
    session.userId = user.userId;
    return user;
  }

  @Post('/logout')
  logOut(@Session() session: any) {
    session.userId = null;
  }
}
