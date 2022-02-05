import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, Observable } from 'rxjs';
import { tmdbPathBuilder } from 'src/common/pathBuilder';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateFilmReviewDto } from './Dto/create-film-review.dto';
import { FilmReviewDto } from './Dto/filmReview.dto';
import { FilmReview } from './entity/filmReview.entity';
import { transformAndValidate } from 'class-transformer-validator';
import { FilmDaoForFindOne, FilmsDao } from './Dao/film.dao';
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original/';
export const DISCOVER_FILM_URL = `/discover/movie`;
export const FILM_FIND_ONE = `/movie`;

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmReview) private repo: Repository<FilmReview>,
    private httpService: HttpService,
  ) {}

  filmsFind(
    filmId: number,
    with_genres: number,
    page: number,
  ): Observable<
    Promise<FilmsDao | FilmsDao[] | FilmDaoForFindOne | FilmDaoForFindOne[]>
  > {
    if (!filmId && !!page && !!with_genres) {
      return this.httpService
        .get(
          tmdbPathBuilder(DISCOVER_FILM_URL, [
            {
              name: 'with_genres',
              value: with_genres,
            },
            {
              name: 'page',
              value: page,
            },
          ]),
        )
        .pipe(
          map(({ data }) => {
            return transformAndValidate(FilmsDao, data, {
              validator: { whitelist: true },
            });
          }),
          catchError((error, errors) => {
            console.log(error, errors);
            throw new BadRequestException();
          }),
        );
    } else if (!page && !with_genres && !!filmId) {
      return this.httpService
        .get(tmdbPathBuilder(`${FILM_FIND_ONE}/${filmId}`))
        .pipe(
          map(({ data }) => {
            return transformAndValidate(FilmDaoForFindOne, data, {
              validator: { whitelist: true },
            });
          }),
          catchError((error, errors) => {
            console.log(error, errors);
            throw new BadRequestException();
          }),
        );
    } else {
      throw new BadRequestException(
        'Only filmId or a pair of page and with_genres are available for the query',
      );
    }
  }

  async reviewFindOne(filmReviewId: number) {
    const entity = await this.repo.findOne(filmReviewId, {
      relations: ['user'],
    });
    console.log(entity);
    return this.filmReviewEntityToDto(entity);
  }

  async reviewCreate(filmReviewDto: CreateFilmReviewDto, user: User) {
    const filmReview = this.repo.create(filmReviewDto);
    filmReview.user = user;
    console.log(filmReview);
    return await this.repo.save(filmReview);
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
      username: user?.username,
      icon: user?.icon,
      iconColor: user?.iconColor,
    };
  }
}
