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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = class RedisService {
    redisClient;
    subClient;
    accessKeysCache = new Map();
    constructor(redisClient, subClient) {
        this.redisClient = redisClient;
        this.subClient = subClient;
    }
    async onModuleInit() {
        await this.subClient.subscribe('access_key_updated', (message) => {
            const data = JSON.parse(message);
            this.accessKeysCache.set(data.key, data);
            console.log('[RedisService] Key updated:', data.key);
        });
    }
    async set(key, value) {
        await this.redisClient.set(key, value);
    }
    async getKey(key) {
        const cached = this.accessKeysCache.get(key);
        if (cached)
            return cached;
        const raw = await this.redisClient.get(key);
        if (!raw)
            return null;
        const parsed = JSON.parse(raw);
        this.accessKeysCache.set(key, parsed);
        return parsed;
    }
    async onModuleDestroy() {
        await this.redisClient.quit();
        await this.subClient.quit();
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __param(1, (0, common_1.Inject)('REDIS_SUB_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof redis_1.RedisClientType !== "undefined" && redis_1.RedisClientType) === "function" ? _a : Object, typeof (_b = typeof redis_1.RedisClientType !== "undefined" && redis_1.RedisClientType) === "function" ? _b : Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map