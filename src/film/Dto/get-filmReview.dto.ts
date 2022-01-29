import { Transform } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class GetFilmReviewDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(5)
  star: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  reviewDate: number;

  @IsString()
  reviewTitle: string;

  @IsString()
  reviewOverview: string;
}
