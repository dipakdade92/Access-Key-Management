import { OnModuleInit } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AccessKeyDto } from 'src/dto/web3-token.dto';
export declare class RedisService implements OnModuleInit {
    private readonly redisClient;
    private readonly subClient;
    private accessKeysCache;
    constructor(redisClient: RedisClientType<any, any>, subClient: RedisClientType<any, any>);
    onModuleInit(): Promise<void>;
    set(key: string, value: string): Promise<void>;
    getKey(key: string): Promise<AccessKeyDto | null>;
    onModuleDestroy(): Promise<void>;
}
