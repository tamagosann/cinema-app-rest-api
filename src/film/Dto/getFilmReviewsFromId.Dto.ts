import { IsNumber } from 'class-validator';

export class GetFilmReviewsFromIdDto {
  @IsNumber()
  filmId!: number;

  @IsNumber()
  page!: number;
}
