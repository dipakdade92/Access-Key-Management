"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const access_key_module_1 = require("./access-key/access-key.module");
const typeorm_1 = require("@nestjs/typeorm");
const entity_access_key_1 = require("./entities/entity.access-key");
const redis_module_1 = require("./redis/redis.module");
const throttler_1 = require("@nestjs/throttler");
const throttler_2 = require("@nestjs/throttler");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: process.env.DB_NAME,
                entities: [entity_access_key_1.AccessKey],
                synchronize: true,
                logging: true,
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60,
                        limit: 5,
                    },
                ],
                errorMessage: 'Too many requests, please try again later!',
            }),
            access_key_module_1.AccessKeyModule,
            redis_module_1.RedisModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, throttler_2.ThrottlerGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map