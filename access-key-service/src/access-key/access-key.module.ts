import { Module } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';
import { AccessKeyController } from './access-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from 'src/entities/entity.access-key';
import { UserAccessKeyController } from './user-access-key.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey]), RedisModule],
  controllers: [AccessKeyController, UserAccessKeyController],
  providers: [AccessKeyService],
})
export class AccessKeyModule {}
