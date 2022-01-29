import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateFilmReviewDto } from './Dto/create-film-review.dto';
import { FilmReviewDto } from './Dto/filmReview.dto';
import { FilmReview } from './entity/filmReview.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmReview) private repo: Repository<FilmReview>,
  ) {}

  async reviewFindOne(filmReviewId: number) {
    const entity = await this.repo.findOne(filmReviewId);
    return this.filmReviewEntityToDto(entity);
  }

  reviewCreate(filmReviewDto: CreateFilmReviewDto, user: User) {
    const filmReview = this.repo.create(filmReviewDto);
    filmReview.user = user;
    return this.repo.save(filmReview);
  }

  async reviewUpdate(filmReviewId: string, attrs: Partial<FilmReviewDto>) {
    const filmReview = await this.repo.findOne(filmReviewId);
    if (!filmReview) {
      throw new NotFoundException('filmReview not found');
    }

    Object.assign(filmReview, attrs);
    return this.repo.save(filmReview);
  }

  private filmReviewEntityToDto({
    filmReviewId,
    star,
    reviewDate,
    reviewTitle,
    reviewOverview,
    user,
  }: FilmReview): FilmReviewDto {
    return {
      filmReviewId,
      star,
      reviewDate,
      reviewTitle,
      reviewOverview,
      userId: user?.userId,
    };
  }
}
