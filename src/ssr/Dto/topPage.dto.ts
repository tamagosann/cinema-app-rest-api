import { IsOptional } from 'class-validator';

export class TopPageSSRDto {
  @IsOptional()
  genre: string;

  @IsOptional()
  search: string;
}
