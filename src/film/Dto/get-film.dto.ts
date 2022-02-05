import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetFilmDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  filmId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  with_genres?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;
}
