import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  transformAndValidate,
  transformAndValidateSync,
} from 'class-transformer-validator';
import { catchError, map, tap } from 'rxjs';
import { tmdbPathBuilder } from 'src/common/pathBuilder';
import { FindAllPeopleDao } from '../dao/people.dao';

const POPULAR_PERSON_URL = '/person/popular';

@Injectable()
export class PeopleRepository {
  constructor(private httpService: HttpService) {}

  findAll(page: number) {
    return this.httpService
      .get(
        tmdbPathBuilder(POPULAR_PERSON_URL, [
          {
            name: 'language',
            value: 'en-US',
          },
          {
            name: 'page',
            value: page,
          },
        ]),
      )
      .pipe(
        map(({ data }) => {
          console.log(data);
          return transformAndValidateSync(FindAllPeopleDao, data, {
            validator: { whitelist: true },
          });
        }),
      );
  }
}
