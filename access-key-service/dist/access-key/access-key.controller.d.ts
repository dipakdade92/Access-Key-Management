import { AccessKeyService } from './access-key.service';
import { CreateAccessKeyDto } from 'src/dto/create-access-key.dto';
import { UpdateAccessKeyDto } from 'src/dto/update-access-key.dto';
export declare class AccessKeyController {
    private readonly service;
    constructor(service: AccessKeyService);
    createKey(dto: CreateAccessKeyDto): Promise<any>;
    listKeys(): any;
    deleteKey(id: string): Promise<{
        message: string;
    }>;
    updateKey(id: string, dto: UpdateAccessKeyDto): Promise<any>;
}
