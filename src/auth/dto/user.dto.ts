import { Exclude, Expose } from 'class-transformer';
import { FilmReview } from 'src/film/entity/filmReview.entity';

export class UserDto {
  @Expose()
  userId: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  icon: string;

  @Expose()
  iconColor: string;

  @Expose()
  filmReviews: FilmReview[];
}
