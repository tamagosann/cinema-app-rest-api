import { IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateFilmReviewDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  star: number;

  @IsNumber()
  reviewDate: number;

  @IsString()
  reviewTitle: string;

  @IsString()
  reviewOverview: string;
}
