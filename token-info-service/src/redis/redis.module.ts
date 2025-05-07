import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient();
        await client.connect();
        return client;
      },
    },
    {
      provide: 'REDIS_SUB_CLIENT',
      useFactory: async () => {
        const client = createClient();
        await client.connect();
        return client;
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
