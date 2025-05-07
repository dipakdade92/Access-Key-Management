import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from './token/token.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { configDotenv } from 'dotenv';
configDotenv();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: process.env.DB_NAME,
    entities: [],
    synchronize: true,
  }), TokenModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
