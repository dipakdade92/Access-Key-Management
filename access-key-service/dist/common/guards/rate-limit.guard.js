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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessKeyRateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const access_key_service_1 = require("../../access-key/access-key.service");
let AccessKeyRateLimitGuard = class AccessKeyRateLimitGuard {
    accessKeyService;
    reflector;
    constructor(accessKeyService, reflector) {
        this.accessKeyService = accessKeyService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const key = request.headers['x-api-key'] || request.query.key;
        if (!key)
            throw new common_1.UnauthorizedException('API key required');
        const allowed = await this.accessKeyService.checkRateLimit(key);
        if (!allowed)
            throw new common_1.HttpException('Rate limit exceeded', common_1.HttpStatus.TOO_MANY_REQUESTS);
        request.accessKey = key;
        return true;
    }
};
exports.AccessKeyRateLimitGuard = AccessKeyRateLimitGuard;
exports.AccessKeyRateLimitGuard = AccessKeyRateLimitGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [access_key_service_1.AccessKeyService,
        core_1.Reflector])
], AccessKeyRateLimitGuard);
//# sourceMappingURL=rate-limit.guard.js.map