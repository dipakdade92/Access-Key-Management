"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessKeyModule = void 0;
const common_1 = require("@nestjs/common");
const access_key_service_1 = require("./access-key.service");
const access_key_controller_1 = require("./access-key.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entity_access_key_1 = require("../entities/entity.access-key");
const user_access_key_controller_1 = require("./user-access-key.controller");
const redis_module_1 = require("../redis/redis.module");
let AccessKeyModule = class AccessKeyModule {
};
exports.AccessKeyModule = AccessKeyModule;
exports.AccessKeyModule = AccessKeyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entity_access_key_1.AccessKey]), redis_module_1.RedisModule],
        controllers: [access_key_controller_1.AccessKeyController, user_access_key_controller_1.UserAccessKeyController],
        providers: [access_key_service_1.AccessKeyService],
    })
], AccessKeyModule);
//# sourceMappingURL=access-key.module.js.map