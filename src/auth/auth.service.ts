import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

// サービスの中で他のサービスを使うのはアリ
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    email: string,
    password: string,
    icon: string,
    iconColor: string,
  ) {
    // emailが使われていないかチェック
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // パスワードをハッシュ化
    // ソルト作成 8バイトのhex化されたstring
    const salt = randomBytes(8).toString('hex');

    // ソルトとパスワードをハッシュ化
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // ハッシュ化された結果とソルトを.で繋げる
    const result = salt + '.' + hash.toString('hex');

    // ユーザーを作成
    const user = await this.userService.create(
      username,
      email,
      result,
      icon,
      iconColor,
    );

    // トークン作成
    const token = await this.jwtService.signAsync(
      {
        id: user.userId,
        email: user.email,
      },
      {
        expiresIn: '1d',
      },
    );

    return { token, user };
  }

  async logIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    const token = await this.jwtService.signAsync(
      {
        id: user.userId,
        email: user.email,
      },
      {
        expiresIn: '1d',
      },
    );
    return { token };
  }

  async postLoginUser(token: string) {
    const { id } = this.jwtService.decode(token) as { id: number };
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const newToken = await this.jwtService.signAsync(
      {
        id: user.userId,
        email: user.email,
      },
      {
        expiresIn: '1d',
      },
    );

    return { token: newToken, user };
  }

  logOut() {
    return 'hoge';
  }

  async validateUserById(userId: number): Promise<boolean> {
    const user = await this.userService.findOne(userId);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
