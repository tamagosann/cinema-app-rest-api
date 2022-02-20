import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/role.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { PostLoginUserDto } from './dto/postLoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body()
    { username, email, password, icon, iconColor }: CreateUserDto, // @Session() session: any,
  ) {
    const user = await this.authService.signUp(
      username,
      email,
      password,
      icon,
      iconColor,
    );
    // session.userId = user.userId;
    return user;
  }

  @Post('/login')
  logIn(@Body() { email, password }: LoginUserDto) {
    return this.authService.logIn(email, password);
  }

  // TODO: cookieからログインしてるユーザーの詳しい情報を得る時は、PostとGetどっちがいいんだろうか
  @UseGuards(AuthGuard('jwt'))
  @Post('/loginUser')
  postLoginUser(@Body() { token }: PostLoginUserDto) {
    return this.authService.postLoginUser(token);
  }

  @Post('/logout')
  logOut(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Get('/profile')
  profile(@Request() req: any) {
    console.log('aaaaa');
    return req.user;
  }
}
