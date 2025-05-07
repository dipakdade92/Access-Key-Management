import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessKey } from 'src/entities/entity.access-key';
import { CreateAccessKeyDto } from 'src/dto/create-access-key.dto';
import { UpdateAccessKeyDto } from 'src/dto/update-access-key.dto';
import { randomBytes } from 'crypto';
import { RedisClientType } from 'redis';

@Injectable()
export class AccessKeyService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType<any, any>,
        @InjectRepository(AccessKey)
        private readonly repo: Repository<AccessKey>,
    ) { }

    generateKey(): string {
        return randomBytes(16).toString('hex');
    }

    async createKey(dto: CreateAccessKeyDto) {
        const key = this.generateKey();
        const accessKey = this.repo.create({
            key,
            rateLimit: dto.rateLimit,
            expiresAt: new Date(dto.expiresAt),
        });
        const createdKey = await this.repo.save(accessKey);

        try {
            await this.redisClient.set(
                createdKey.key,
                JSON.stringify({
                    rateLimit: createdKey.rateLimit,
                    expiresAt: createdKey.expiresAt,
                    isDisabled: createdKey.isDisabled || false,
                })
            );

            const publish = await this.redisClient.publish(
                'access_key_updated',
                JSON.stringify({
                    key: createdKey.key,
                    rateLimit: createdKey.rateLimit,
                    expiresAt: createdKey.expiresAt,
                }),
            );
        } catch (err) {
            console.error('Error publishing to Redis:', err);
        }
        return createdKey;
    }

    listKeys() {
        return this.repo.find({ where: { isDeleted: false } });
    }

    async deleteKey(id: string) {
        const key = await this.repo.findOne({ where: { id, isDeleted: false } });
        if (!key) throw new NotFoundException('Key not found');
        key.isDeleted = true;
        await this.repo.save(key);
        return { message: 'Key deleted' };
    }

    async updateKey(id: string, dto: UpdateAccessKeyDto) {
        const key = await this.repo.findOneBy({ id, isDeleted: false });
        if (!key) throw new NotFoundException('Key not found');

        if (dto.rateLimit !== undefined) key.rateLimit = dto.rateLimit;
        if (dto.expiresAt !== undefined) key.expiresAt = new Date(dto.expiresAt);
        return this.repo.save(key);
    }

    async findByKey(key: string) {
        return this.repo.findOne({ where: { key, isDeleted: false, isDisabled: false } });
    }

    async disableKey(key: string) {
        const accessKey = await this.repo.findOne({ where: { key, isDeleted: false } });
        if (!accessKey) return null;
        if (accessKey.isDisabled) {
            return { message: 'Key is already disabled' };
        }
        accessKey.isDisabled = true;
        return this.repo.save(accessKey);
    }

    async checkRateLimit(key: string): Promise<boolean> {
        const redisKey = `ratelimit:${key}`;
        const accessKey = await this.repo.findOne({ where: { key, isDeleted: false } });

        if (!accessKey) throw new NotFoundException('Key not found');
        if (accessKey.isDisabled) throw new Error('Key is disabled');

        const limit = accessKey.rateLimit ?? 100; // default limit if not set

        const current = await this.redisClient.incr(redisKey);
        if (current === 1) {
            // set expiry for the time window (e.g., 60 seconds)
            await this.redisClient.expire(redisKey, 60);
        }

        return current <= limit;
    }

}
