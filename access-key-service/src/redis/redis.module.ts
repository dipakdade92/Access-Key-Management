    // src/redis/redis.module.ts
import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { configDotenv } from 'dotenv'
configDotenv();

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({ url: `redis://localhost:${process.env.REDIS_PORT}` });
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
