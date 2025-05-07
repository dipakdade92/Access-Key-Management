// src/token/token.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Web3TokenInfo } from './interfaces/web3token.interface';

@Injectable()
export class TokenService {
  constructor(private readonly redisService: RedisService) {}

  async validateKey(key: string): Promise<boolean> {
    const keyDetails = this.redisService.getKey(key);
    return !!keyDetails;
  }

  async fetchTokenInfo(accessKey: string): Promise<Web3TokenInfo> {
    const keyDetails = this.redisService.getKey(accessKey);
    if (!keyDetails) throw new NotFoundException('Access key not found');

    const parsedKeyDetails = JSON.parse(JSON.stringify(keyDetails));

    if (new Date() > new Date(parsedKeyDetails.expiresAt)) {
      throw new Error('Access key has expired');
    }

    if (parsedKeyDetails.rateLimit <= 0) {
      throw new Error('Rate limit exceeded');
    }

    return this.getMockTokenInfo();
  }

  private getMockTokenInfo(): Web3TokenInfo {
    return {
      tokenName: 'Ethereum',
      symbol: 'ETH',
      price: 2500,
    };
  }
}
