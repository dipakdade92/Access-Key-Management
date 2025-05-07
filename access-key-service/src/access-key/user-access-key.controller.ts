import { Controller, Get, Patch, Headers, NotFoundException } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';

@Controller('user/key')
export class UserAccessKeyController {
  constructor(private readonly service: AccessKeyService) {}

  @Get()
  async getKeyDetails(@Headers('x-api-key') key: string) {
    const accessKey = await this.service.findByKey(key);
    if (!accessKey || accessKey.isDisabled) throw new NotFoundException('Invalid or disabled key');
    return {
      key: accessKey.key,
      rateLimit: accessKey.rateLimit,
      expiresAt: accessKey.expiresAt,
      disabled: accessKey.isDisabled,
    };
  }

  @Patch('disable')
  async disableKey(@Headers('x-api-key') key: string) {
    const updated = await this.service.disableKey(key);
    if (!updated) throw new NotFoundException('Key not found');
    return { message: 'Key disabled successfully' };
  }
}
