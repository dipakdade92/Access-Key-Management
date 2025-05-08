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
const typeorm_1 = require("@nestjs/typeorm");
const token_module_1 = require("./token/token.module");
const redis_module_1 = require("./redis/redis.module");
const dotenv_1 = require("dotenv");
const throttler_1 = require("@nestjs/throttler");
const throttler_2 = require("@nestjs/throttler");
(0, dotenv_1.configDotenv)();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: process.env.DB_NAME,
                entities: [],
                synchronize: true,
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
            token_module_1.TokenModule,
            redis_module_1.RedisModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, throttler_2.ThrottlerGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map