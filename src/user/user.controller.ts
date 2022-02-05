import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from 'src/auth/dto/user.dto';
import { Serialize } from 'src/intercepters/serialize.interceptor';
import { UPdateUserDto } from './dto/update-user.dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UserService } from './user.service';

@Controller('user')
// @UseInterceptors(new SerializeInterceptor(UserDto))
// ここで、外に出すパラメータと隠すパラメータを定期
@Serialize(UserDto)
// currentUserのデコレータに入ってくるデータをリクエストをインターセプトして作っている
// ここに書いてcontroller毎に使う方法と、globalに使う方法もある。user.moduleを参照。
// @UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userId')
  async findUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(parseInt(userId));
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Delete('/:userId')
  removeUser(@Param('userId') userId: string) {
    return this.userService.remove(parseInt(userId));
  }

  @Patch('/:userId')
  updateUser(@Param('userId') id: string, @Body() body: UPdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
