import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('vamoooooo Nesttt carajoooo');
    console.log('in your fucking face goooo');


    return this.appService.getHello();
  }
}
