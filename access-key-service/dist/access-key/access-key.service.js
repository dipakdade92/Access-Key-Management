"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessKeyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_access_key_1 = require("../entities/entity.access-key");
const crypto_1 = require("crypto");
let AccessKeyService = class AccessKeyService {
    redisClient;
    repo;
    constructor(redisClient, repo) {
        this.redisClient = redisClient;
        this.repo = repo;
    }
    generateKey() {
        return (0, crypto_1.randomBytes)(16).toString('hex');
    }
    async createKey(dto) {
        const key = this.generateKey();
        const accessKey = this.repo.create({
            key,
            rateLimit: dto.rateLimit,
            expiresAt: new Date(dto.expiresAt),
        });
        const createdKey = await this.repo.save(accessKey);
        try {
            await this.redisClient.set(createdKey.key, JSON.stringify({
                rateLimit: createdKey.rateLimit,
                expiresAt: createdKey.expiresAt,
                isDisabled: createdKey.isDisabled || false,
            }));
            const publish = await this.redisClient.publish('access_key_updated', JSON.stringify({
                key: createdKey.key,
                rateLimit: createdKey.rateLimit,
                expiresAt: createdKey.expiresAt,
            }));
        }
        catch (err) {
            console.error('Error publishing to Redis:', err);
        }
        return createdKey;
    }
    listKeys() {
        return this.repo.find({ where: { isDeleted: false } });
    }
    async deleteKey(id) {
        const key = await this.repo.findOne({ where: { id, isDeleted: false } });
        if (!key)
            throw new common_1.NotFoundException('Key not found');
        key.isDeleted = true;
        await this.repo.save(key);
        return { message: 'Key deleted' };
    }
    async updateKey(id, dto) {
        const key = await this.repo.findOneBy({ id, isDeleted: false });
        if (!key)
            throw new common_1.NotFoundException('Key not found');
        if (dto.rateLimit !== undefined)
            key.rateLimit = dto.rateLimit;
        if (dto.expiresAt !== undefined)
            key.expiresAt = new Date(dto.expiresAt);
        return this.repo.save(key);
    }
    async findByKey(key) {
        return this.repo.findOne({ where: { key, isDeleted: false, isDisabled: false } });
    }
    async disableKey(key) {
        const accessKey = await this.repo.findOne({ where: { key, isDeleted: false } });
        if (!accessKey)
            return null;
        if (accessKey.isDisabled) {
            return { message: 'Key is already disabled' };
        }
        accessKey.isDisabled = true;
        return this.repo.save(accessKey);
    }
    async checkRateLimit(key) {
        const redisKey = `ratelimit:${key}`;
        const accessKey = await this.repo.findOne({ where: { key, isDeleted: false } });
        if (!accessKey)
            throw new common_1.NotFoundException('Key not found');
        if (accessKey.isDisabled)
            throw new Error('Key is disabled');
        const limit = accessKey.rateLimit ?? 100;
        const current = await this.redisClient.incr(redisKey);
        if (current === 1) {
            await this.redisClient.expire(redisKey, 60);
        }
        return current <= limit;
    }
};
exports.AccessKeyService = AccessKeyService;
exports.AccessKeyService = AccessKeyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __param(1, (0, typeorm_1.InjectRepository)(entity_access_key_1.AccessKey)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository])
], AccessKeyService);
//# sourceMappingURL=access-key.service.js.map