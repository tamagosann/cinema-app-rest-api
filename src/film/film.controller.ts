import { Controller, Get, Query } from '@nestjs/common';
import { GetFilmReviewsFromIdDto } from './Dto/getFilmReviewsFromId.Dto';
import { FilmService } from './film.service';

export const stabReviewList = [
  {
    id: '0001',
    isMobileSize: true,
    userIconUrl: `/5UmoOvOmnCHiJj3TAKVn7uNAKAW.jpg`,
    username: '木村拓哉',
    userIconColor: 'red',
    star: 2,
    reviewDate: Date.now(),
    reviewTitle:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
    overview:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  },
  {
    id: '0002',
    isMobileSize: true,
    userIconUrl: `/5UmoOvOmnCHiJj3TAKVn7uNAKAW.jpg`,
    username: '木村拓哉',
    userIconColor: 'red',
    star: 2,
    reviewDate: Date.now(),
    reviewTitle:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
    overview:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  },
  {
    id: '0003',
    isMobileSize: true,
    userIconUrl: `/5UmoOvOmnCHiJj3TAKVn7uNAKAW.jpg`,
    username: '木村拓哉',
    userIconColor: 'red',
    star: 2,
    reviewDate: Date.now(),
    reviewTitle:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
    overview:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  },
  {
    id: '0004',
    isMobileSize: true,
    userIconUrl: `/5UmoOvOmnCHiJj3TAKVn7uNAKAW.jpg`,
    username: '木村拓哉',
    userIconColor: 'red',
    star: 2,
    reviewDate: Date.now(),
    reviewTitle:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
    overview:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  },
  {
    id: '0005',
    isMobileSize: true,
    userIconUrl: `/5UmoOvOmnCHiJj3TAKVn7uNAKAW.jpg`,
    username: '木村拓哉',
    userIconColor: 'red',
    star: 2,
    reviewDate: Date.now(),
    reviewTitle:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
    overview:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  },
  {
    id: '0006',
    isMobileSize: true,
    userIconUrl: `/5UmoOvOmnCHiJj3TAKVn7uNAKAW.jpg`,
    username: '木村拓哉',
    userIconColor: 'red',
    star: 2,
    reviewDate: Date.now(),
    reviewTitle:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
    overview:
      'Faced with the unexpected death of his estranged father -El Máscara- and the subsequent theft of his precious mask, Rubén -Mascarita- will find himself confronted with his past. Alongside his invincible bodyguard Tony "The Cannibal" and, an unexpected ally, he will have only one day to recover it and make amends with the memory of his father.',
  },
];

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get('/review')
  async getFilmReviewsFromId(@Query() query: GetFilmReviewsFromIdDto) {
    const { filmId, page } = query;

    console.log('きたよ');
    return {
      page: page,
      results: stabReviewList,
      totalPages: 10,
      totalResults: 1000,
    };
  }
}
