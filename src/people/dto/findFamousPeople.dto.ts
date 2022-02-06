import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindFamousPeopleDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page: number;
}
