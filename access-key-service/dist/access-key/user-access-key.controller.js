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
exports.UserAccessKeyController = void 0;
const common_1 = require("@nestjs/common");
const access_key_service_1 = require("./access-key.service");
let UserAccessKeyController = class UserAccessKeyController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getKeyDetails(key) {
        const accessKey = await this.service.findByKey(key);
        if (!accessKey || accessKey.isDisabled)
            throw new common_1.NotFoundException('Invalid or disabled key');
        return {
            key: accessKey.key,
            rateLimit: accessKey.rateLimit,
            expiresAt: accessKey.expiresAt,
            disabled: accessKey.isDisabled,
        };
    }
    async disableKey(key) {
        const updated = await this.service.disableKey(key);
        if (!updated)
            throw new common_1.NotFoundException('Key not found');
        return { message: 'Key disabled successfully' };
    }
};
exports.UserAccessKeyController = UserAccessKeyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAccessKeyController.prototype, "getKeyDetails", null);
__decorate([
    (0, common_1.Patch)('disable'),
    __param(0, (0, common_1.Headers)('x-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAccessKeyController.prototype, "disableKey", null);
exports.UserAccessKeyController = UserAccessKeyController = __decorate([
    (0, common_1.Controller)('user/key'),
    __metadata("design:paramtypes", [access_key_service_1.AccessKeyService])
], UserAccessKeyController);
//# sourceMappingURL=user-access-key.controller.js.map