import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { filmFindOneDto } from 'src/film/Dto/film.dto';

export class People {
  @ApiProperty({
    description: 'gender num for the people',
    example: 1,
  })
  @Expose()
  gender: 1 | 2;

  @ApiProperty({
    description: 'id for the people',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'name for the people',
    example: 1,
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'profile_path for the people',
    example: 1,
  })
  @Expose()
  profile_path: string;

  @ApiProperty({
    description: 'films the people is known for',
    example: 1,
  })
  @Expose()
  @Type(() => filmFindOneDto)
  @ValidateNested()
  known_for: filmFindOneDto;
}

export class PeopleDto {
  @ApiProperty({
    description: 'page for the response',
    example: 1,
  })
  @Expose()
  page: number;

  @ApiProperty({
    type: () => People,
    description: 'results for the response',
    example: [
      {
        gender: 2,
        id: 7242,
        name: 'Temuera Morrison',
        profile_path: '/1ckHDFgKXJ8pazmvLCW7DeOKqA0.jpg',
        known_for: [
          {
            release_date: '2018-07-06',
            title: 'Aquaman',
            id: 297802,
            backdrop_path: '/9QusGjxcYvfPD1THg6oW3RLeNn7.jpg',
            genre_ids: [28, 12, 14],
            poster_path: '/xLPffWMhMj1l50ND3KchMjYoKmE.jpg',
            overview:
              "Once home to the most advanced civilization on Earth, Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people and then the surface world. Standing in his way is Arthur Curry, Orm's half-human, half-Atlantean brother and true heir to the throne.",
            original_title: 'Aquaman',
          },
        ],
      },
    ],
  })
  @Expose()
  @Type(() => People)
  @ValidateNested()
  results: People[];

  @ApiProperty({
    description: 'total pages for the response',
    example: 1,
  })
  @Expose()
  total_pages: number;

  @ApiProperty({
    description: 'total results for the response',
    example: 1,
  })
  @Expose()
  total_results: number;
}

export const PageParamSchema = {
  default: 111,
  example: 10,
  type: 'number',
};
