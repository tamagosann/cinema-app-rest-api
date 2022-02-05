import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { FilmReview } from './entity/filmReview.entity';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmReview, User]),
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/3',
    }),
  ],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
