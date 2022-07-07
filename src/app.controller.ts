import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

// @UseInterceptors(CacheInterceptor) //di console log hanya mereturn satu saja, karena dengan interceptor ini kita sudah menyimpannya di cache
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @CacheKey('some_route') //Untuk meng-cache satu rute saja
  // @CacheTTL(60) //Mengatur waaktu cache
  async getHello() {
    return this.appService.getHello();
  }
}
