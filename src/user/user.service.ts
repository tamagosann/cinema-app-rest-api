import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(
    username: string,
    email: string,
    password: string,
    icon: string,
    iconColor: string,
  ) {
    const user = this.repo.create({
      username,
      email,
      password,
      icon,
      iconColor,
    });
    console.log('aaa');
    console.log(user);

    const result = this.repo.save(user);
    console.log(result);
    return result;
  }

  findOne(userId: number) {
    return this.repo.findOne(userId);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(userId: number, attrs: Partial<User>) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(userId: number) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
