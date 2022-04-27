import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppRouter {
  @Get()
  getHello(): string {
    return '';
  }
}
