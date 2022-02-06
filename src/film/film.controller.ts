import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { catchError, map, Observable } from 'rxjs';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGUard } from 'src/guards/auth.guard';
import { Serialize } from 'src/intercepters/serialize.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { ErrorDto } from 'src/utils/error.dto';
import { FilmDaoForFindOne, FilmsDao } from './Dao/film.dao';
import { CreateFilmReviewDto } from './Dto/create-film-review.dto';
import { FilmDto } from './Dto/film.dto';
import { FilmReviewDto } from './Dto/filmReview.dto';
import {
  GetFilmDto,
  PageParamSchema,
  WithGenresParamSchema,
} from './Dto/get-film.dto';
import {
  FilmReviewIdParamSchema,
  GetFilmReviewDto,
} from './Dto/get-filmReview.dto';
import { UpdateFilmReviewDto } from './Dto/update-filmReview.dto';
import { FilmService } from './film.service';
@ApiTags('Film')
@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @ApiOperation({
    summary: 'Get a filmList or a film identical to filmReviewId or genreId',
  })
  @ApiOkResponse({ description: 'Success', type: FilmDto })
  @ApiNotFoundResponse({
    description: 'Resource not found',
    type: ErrorDto,
  })
  @ApiQuery({
    name: 'filmId',
    required: false,
    description: 'id to a film',
    schema: FilmReviewIdParamSchema,
  })
  @ApiQuery({
    name: 'with_genres',
    required: false,
    description: 'genreId to search for films',
    schema: WithGenresParamSchema,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'page number of a whole list',
    schema: PageParamSchema,
  })
  @Get()
  getFilm(
    @Query() { filmId, with_genres, page }: GetFilmDto,
  ): Observable<
    Promise<FilmsDao | FilmDaoForFindOne | FilmsDao[] | FilmDaoForFindOne[]>
  > {
    return this.filmService.filmsFind(filmId, with_genres, page);
  }

  @ApiOperation({ summary: 'Get a filmReview identical to filmReviewId' })
  @ApiOkResponse({ description: 'Success', type: FilmReviewDto })
  @ApiNotFoundResponse({
    description: 'Resource not found',
    type: ErrorDto,
  })
  @ApiQuery({
    name: 'filmReviewId',
    required: true,
    description: 'id to a filmReview',
    schema: FilmReviewIdParamSchema,
  })
  @Get('/review')
  getReview(
    @Query() { filmReviewId }: GetFilmReviewDto,
  ): Promise<FilmReviewDto> {
    return this.filmService.reviewFindOne(parseInt(filmReviewId));
  }

  @ApiCookieAuth()
  @ApiCreatedResponse({ description: 'Success' })
  @ApiForbiddenResponse({
    description: 'Forbidden response',
    type: ErrorDto,
  })
  @Post('/review')
  @UseGuards(AuthGUard)
  @Serialize(FilmReviewDto)
  createReview(@Body() body: CreateFilmReviewDto, @CurrentUser() user: User) {
    return this.filmService.reviewCreate(body, user);
  }

  @ApiNotFoundResponse({ description: 'Resource not found', type: ErrorDto })
  @Patch('/review/:reviewId')
  @UseGuards(AdminGuard)
  updateFilmReview(
    @Param('reviewId') reviewId: string,
    @Body() body: UpdateFilmReviewDto,
  ) {
    return this.filmService.reviewUpdate(reviewId, body);
  }
}
