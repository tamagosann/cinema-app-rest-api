import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Observable, tap } from 'rxjs';
import { Serialize } from 'src/intercepters/serialize.interceptor';
import { ErrorDto } from 'src/utils/error.dto';
import { FindAllPeopleDao } from './dao/people.dao';
import { FindFamousPeopleDto } from './dto/findFamousPeople.dto';
import { PageParamSchema, PeopleDto } from './dto/people.dto';
import { PeopleService } from './people.service';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @ApiOperation({
    summary: 'Get a person list',
  })
  @ApiOkResponse({ description: 'Success', type: PeopleDto })
  @ApiNotFoundResponse({
    description: 'Resource not found',
    type: ErrorDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'page number of a whole list',
    schema: PageParamSchema,
  })
  @Get()
  @Serialize(PeopleDto)
  async findFamousPeople(
    @Query() { page }: FindFamousPeopleDto,
  ): Promise<Observable<FindAllPeopleDao | FindAllPeopleDao[]>> {
    return this.peopleService.findFamousPeople(page);
  }
}
