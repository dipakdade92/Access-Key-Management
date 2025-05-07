import { RedisService } from '../redis/redis.service';
import { Web3TokenInfo } from './interfaces/web3token.interface';
export declare class TokenService {
    private readonly redisService;
    constructor(redisService: RedisService);
    validateKey(key: string): Promise<boolean>;
    fetchTokenInfo(accessKey: string): Promise<Web3TokenInfo>;
    private getMockTokenInfo;
}
