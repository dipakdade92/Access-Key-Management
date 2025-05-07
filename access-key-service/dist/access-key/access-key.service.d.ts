import { Repository } from 'typeorm';
import { AccessKey } from 'src/entities/entity.access-key';
import { CreateAccessKeyDto } from 'src/dto/create-access-key.dto';
import { UpdateAccessKeyDto } from 'src/dto/update-access-key.dto';
import { RedisClientType } from 'redis';
export declare class AccessKeyService {
    private readonly redisClient;
    private readonly repo;
    constructor(redisClient: RedisClientType<any, any>, repo: Repository<AccessKey>);
    generateKey(): string;
    createKey(dto: CreateAccessKeyDto): Promise<AccessKey>;
    listKeys(): Promise<AccessKey[]>;
    deleteKey(id: string): Promise<{
        message: string;
    }>;
    updateKey(id: string, dto: UpdateAccessKeyDto): Promise<AccessKey>;
    findByKey(key: string): Promise<AccessKey | null>;
    disableKey(key: string): Promise<AccessKey | {
        message: string;
    } | null>;
    checkRateLimit(key: string): Promise<boolean>;
}
