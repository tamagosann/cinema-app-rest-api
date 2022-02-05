import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FilmsDao {
  @IsNumber()
  page: number;

  @IsArray()
  @Type(() => FilmDaoForAll)
  @ValidateNested()
  results: FilmDaoForAll[];

  @IsNumber()
  total_pages: number;

  @IsNumber()
  total_results: number;
}

export class FilmDaoForAll {
  @IsString()
  @IsOptional()
  release_date: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  backdrop_path?: string;

  @IsArray()
  @IsOptional()
  genre_ids: string[];

  @IsString()
  @IsOptional()
  poster_path: string;

  @IsString()
  @IsOptional()
  overview: string;

  @IsString()
  @IsOptional()
  original_title: string;
}

export class FilmDaoForFindOne {
  @IsString()
  @IsOptional()
  release_date: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  backdrop_path: string;

  @IsArray()
  @IsOptional()
  @Expose({ name: 'genres' })
  @Transform(({ value }) => {
    return value.map((genre: Genre) => genre.id);
  })
  genre_ids: number[];

  @IsString()
  @IsOptional()
  poster_path: string;

  @IsString()
  @IsOptional()
  overview: string;

  @IsString()
  @IsOptional()
  original_title: string;
}

class Genre {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
