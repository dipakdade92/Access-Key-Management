import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessKeyModule } from './access-key/access-key.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from './entities/entity.access-key';
import { RedisModule } from './redis/redis.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME,
      entities: [AccessKey],
      synchronize: true,
      logging: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 5,
        },
      ],
      errorMessage: 'Too many requests, please try again later!',
    }),
    AccessKeyModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, ThrottlerGuard],
})
export class AppModule {}
