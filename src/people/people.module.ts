import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleRepository } from './repository/people.repository';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/3',
    }),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
})
export class PeopleModule {}
