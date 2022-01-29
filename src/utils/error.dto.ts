import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ErrorDto {
  @ApiProperty({
    description: 'Error code',
    readOnly: true,
    example: 'Invalid resource Id',
  })
  @Expose()
  statusCode: string;

  @ApiProperty({
    description: 'Error message',
    readOnly: true,
    example: [
      'filmReviewId must be a number conforming to the specified constraints',
    ],
  })
  @Expose()
  message?: string | string[];

  @ApiProperty({
    description: 'Error for what',
    readOnly: true,
    example: 'Resource you requested does not exist.',
  })
  @Expose()
  error?: string;
}
