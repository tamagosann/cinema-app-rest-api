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
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGUard } from 'src/guards/auth.guard';
import { Serialize } from 'src/intercepters/serialize.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { CreateFilmReviewDto } from './Dto/create-film-review.dto';
import { FilmReviewDto } from './Dto/filmReview.dto';
import { GetFilmReviewDto } from './Dto/get-filmReview.dto';
import { UpdateFilmReviewDto } from './Dto/update-filmReview.dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get('/review')
  getReview(@Query() query: GetFilmReviewDto) {
    console.log(query);
  }

  @Post('/review')
  @UseGuards(AuthGUard)
  @Serialize(FilmReviewDto)
  createReview(@Body() body: CreateFilmReviewDto, @CurrentUser() user: User) {
    return this.filmService.reviewCreate(body, user);
  }

  @Patch('/review/:reviewId')
  @UseGuards(AdminGuard)
  updateFilmReview(
    @Param('reviewId') reviewId: string,
    @Body() body: UpdateFilmReviewDto,
  ) {
    return this.filmService.reviewUpdate(reviewId, body);
  }
}
