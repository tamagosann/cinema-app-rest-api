import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmReview } from 'src/film/entity/filmReview.entity';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtCOnstants } from 'src/common/constants/jwt.constants';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy/jwt-strategy.service';
@Module({
  imports: [
    JwtModule.register({ secret: jwtCOnstants.secret }),
    TypeOrmModule.forFeature([User, FilmReview]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategyService],
})
export class AuthModule {}
