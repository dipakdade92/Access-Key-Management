import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessKeyService } from 'src/access-key/access-key.service';
export declare class AccessKeyRateLimitGuard implements CanActivate {
    private readonly accessKeyService;
    private readonly reflector;
    constructor(accessKeyService: AccessKeyService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
