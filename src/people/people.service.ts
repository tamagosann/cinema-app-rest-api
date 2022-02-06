import { Injectable } from '@nestjs/common';
import { PeopleRepository } from './repository/people.repository';

@Injectable()
export class PeopleService {
  constructor(private peopleRepository: PeopleRepository) {}

  findFamousPeople(page: number) {
    return this.peopleRepository.findAll(page);
  }
}
