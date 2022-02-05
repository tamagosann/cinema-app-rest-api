import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { IsNumber, IsString } from 'class-validator';

export class GetFilmReviewDto {
  @IsString()
  filmReviewId: string;
  // @Transform(({ value }) => parseInt(value))
  // @IsNumber()
  // @Min(0)
  // @Max(5)
  // star: number;

  // @Transform(({ value }) => parseInt(value))
  // @IsNumber()
  // reviewDate: number;

  // @IsString()
  // reviewTitle: string;

  // @IsString()
  // reviewOverview: string;
}

export const FilmReviewIdParamSchema: SchemaObject = {
  default: 111,
  example: 10,
  type: 'number',
};
