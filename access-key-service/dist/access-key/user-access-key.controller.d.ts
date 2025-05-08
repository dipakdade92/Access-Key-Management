import { AccessKeyService } from './access-key.service';
export declare class UserAccessKeyController {
    private readonly service;
    constructor(service: AccessKeyService);
    getKeyDetails(key: string): Promise<{
        key: any;
        rateLimit: any;
        expiresAt: any;
        disabled: any;
    }>;
    disableKey(key: string): Promise<{
        message: string;
    }>;
}
