import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessKeyModule } from './access-key/access-key.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from './entities/entity.access-key';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: process.env.DB_NAME,
    entities: [AccessKey],
    synchronize: true,
    logging: true,  
  }), AccessKeyModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
