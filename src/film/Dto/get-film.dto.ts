import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
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

export const FilmIdParamSchema: SchemaObject = {
  default: 111,
  example: 10,
  type: 'number',
};

export const WithGenresParamSchema: SchemaObject = {
  default: 111,
  example: 10,
  type: 'number',
};

export const PageParamSchema: SchemaObject = {
  default: 111,
  example: 10,
  type: 'number',
};
