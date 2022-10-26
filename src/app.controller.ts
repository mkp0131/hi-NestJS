import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  getHome() {
    return 'This is NestJS API';
  }
}
