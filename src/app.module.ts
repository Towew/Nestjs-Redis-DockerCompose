import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60, //Menyimpan cache dengan total 60detik
      // max: 1000, //Menyimpan cache sebesar 1000 items
      // isGlobal: true, //Globaly using cache without importing
      store: redisStore, //connect to redis
      url: 'redis://127.0.0.1:6379',
    }),
    // RedisModule.register({
    //   host: 'redis',
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, //Ini untuk menggunakan cache interceptor ke semua controllers dan service yang ada di module ini
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
