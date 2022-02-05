import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmReview } from 'src/film/entity/filmReview.entity';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, FilmReview])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
