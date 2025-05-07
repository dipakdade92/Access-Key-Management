// src/redis/redis.service.ts
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AccessKeyDto } from 'src/dto/web3-token.dto';

@Injectable()
export class  RedisService implements OnModuleInit {
  private accessKeysCache = new Map<string, AccessKeyDto>();

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType<any, any>,
    @Inject('REDIS_SUB_CLIENT') private readonly subClient: RedisClientType<any, any>,
  ) {}

  async onModuleInit() {
    await this.subClient.subscribe('access_key_updated', (message) => {
      const data: AccessKeyDto = JSON.parse(message);
      this.accessKeysCache.set(data.key, data);
      console.log('[RedisService] Key updated:', data.key);
    });
  }
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getKey(key: string): Promise<AccessKeyDto | null> {
    const cached = this.accessKeysCache.get(key);
    if (cached) return cached;
  
    // Fallback to Redis
    const raw = await this.redisClient.get(key);
    if (!raw) return null;
  
    const parsed = JSON.parse(raw) as AccessKeyDto;
    this.accessKeysCache.set(key, parsed); // optional: cache it in memory for next time
    return parsed;
  }


  async onModuleDestroy() {
    await this.redisClient.quit();
    await this.subClient.quit();
  }
}
