import { AccessKeyService } from './access-key.service';
export declare class UserAccessKeyController {
    private readonly service;
    constructor(service: AccessKeyService);
    getKeyDetails(key: string): Promise<{
        key: string;
        rateLimit: number;
        expiresAt: Date;
        disabled: false;
    }>;
    disableKey(key: string): Promise<{
        message: string;
    }>;
}
