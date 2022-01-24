import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateFilmReviewDto } from './Dto/create-film-review.dto';
import { FilmReview } from './entity/filmReview.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmReview) private repo: Repository<FilmReview>,
  ) {}

  reviewCreate(filmReviewDto: CreateFilmReviewDto, user: User) {
    const filmReview = this.repo.create(filmReviewDto);
    filmReview.user = user;
    return this.repo.save(filmReview);
  }
}
