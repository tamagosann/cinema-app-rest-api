import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FilmReviewDto {
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  @Expose()
  filmReviewId: number;

  @ApiProperty({
    description: 'Reviewed Star',
    example: 2.5,
  })
  @Expose()
  star: number;

  @ApiProperty({
    description: 'Date of Review',
    example: 123456,
  })
  @Expose()
  reviewDate: number;

  @ApiProperty({
    description: 'Title of Review',
    example: 'れびゅーたいとる',
  })
  @Expose()
  reviewTitle: string;

  @ApiProperty({
    description: 'Overview of Review',
    example: 'とても面白かった',
  })
  @Expose()
  reviewOverview: string;

  @ApiProperty({
    description: 'userId of the Reviewer',
    example: 1,
  })
  // filmReviewEntityToDtoで行うためコメントアウト
  // @Transform(({ obj }) => obj.user.userId)
  @Expose()
  userId: number;
}
