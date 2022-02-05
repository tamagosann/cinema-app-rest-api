import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { FilmDaoForAll } from '../Dao/film.dao';

export class FilmDto {
  @ApiProperty({
    description: 'Page for the totalFilm number',
    example: 1,
  })
  @Expose()
  page: number;

  @ApiProperty({
    description: 'Film information',
    example: {
      backdrop_path: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
      genre_ids: [28, 12, 878],
      id: 634649,
      original_title: 'Spider-Man: No Way Home',
      overview:
        'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
      poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      release_date: '2021-12-15',
      title: 'Spider-Man: No Way Home',
    },
  })
  @Expose()
  results: FilmDaoForAll[];

  @ApiProperty({
    description: 'TotalPages for the genre',
    example: 1,
  })
  @Expose()
  total_pages: number;

  @ApiProperty({
    description: 'Total Films for the genre',
    example: 1,
  })
  @Expose()
  total_results: number;
}
