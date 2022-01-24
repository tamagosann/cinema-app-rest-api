import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGUard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { CreateFilmReviewDto } from './Dto/create-film-review.dto';
import { GetFilmReviewsFromIdDto } from './Dto/getFilmReviewsFromId.Dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Post('/review')
  // @UseGuards(AuthGUard)
  createReview(@Body() body: CreateFilmReviewDto, @CurrentUser() user: User) {
    return this.filmService.reviewCreate(body, user);
  }
}
