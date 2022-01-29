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
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGUard } from 'src/guards/auth.guard';
import { Serialize } from 'src/intercepters/serialize.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { ErrorDto } from 'src/utils/error.dto';
import { CreateFilmReviewDto } from './Dto/create-film-review.dto';
import { FilmReviewDto } from './Dto/filmReview.dto';
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
    return this.filmService.reviewFindOne(filmReviewId);
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
