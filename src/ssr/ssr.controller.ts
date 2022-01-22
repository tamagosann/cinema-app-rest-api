import { Controller, Get, Query } from '@nestjs/common';
import { TopPageSSRDto } from './Dto/topPage.dto';
import { SsrService } from './ssr.service';

@Controller('ssr')
export class SsrController {
  constructor(private ssrService: SsrService) {}
  @Get('/')
  async ssrTopPage(@Query() query: TopPageSSRDto) {
    const { genre, search } = query;
    console.log('きたよ');
    return 'okokok';
  }
}
