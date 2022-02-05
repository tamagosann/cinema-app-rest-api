import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  sayHello() {
    console.log('hello');
    return 'aaa';
  }
}
