import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmReview } from './entity/filmReview.entity';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmReview])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
