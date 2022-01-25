import { Expose, Transform } from 'class-transformer';

export class FilmReviewDto {
  @Expose()
  filmReviewId: number;

  @Expose()
  star: number;

  @Expose()
  reviewDate: number;

  @Expose()
  reviewTitle: string;

  @Expose()
  reviewOverview: string;

  @Transform(({ obj }) => obj.user.userId)
  @Expose()
  userId: number;
}
