import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FilmDaoForAll } from 'src/film/Dao/film.dao';

export class FindAllPeopleDao {
  @IsNumber()
  page: number;

  @IsArray()
  @Type(() => FindOnePeopleDao)
  @ValidateNested()
  results: FindOnePeopleDao[];

  @IsNumber()
  total_pages: number;

  @IsNumber()
  total_results: number;
}

export class FindOnePeopleDao {
  @IsOptional()
  @IsNumber()
  gender: 1 | 2;

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profile_path: string;

  @IsOptional()
  @Type(() => FilmDaoForAll)
  @ValidateNested()
  known_for: FilmDaoForAll[];
}
