import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, //Cache manager
  ) {}

  async getHello() {
    await this.cacheManager.set(
      'cached_item',
      {
        //Par1 adalah penamaan untuk cache nya dan dibawah namanya menyesuaikan cached_item untuk memanggil cache
        key: 32, //ini untuk menyimpan cache, data didalam boleh bebas
      },
      {
        ttl: 10, //kita bisa mengatur waktu cache di par3 dalam object
      },
    );

    await this.cacheManager.del('cached_item'); //untuk menghapus cache

    await this.cacheManager.reset(); //menghapus semua cache, bukan hanya 'cached_item' saja

    const cachedItem = await this.cacheManager.get('cached_item');

    console.log(cachedItem);
    return 'Hello World!';
  }
}
