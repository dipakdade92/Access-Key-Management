import { Controller, Post, Body, UseGuards, Get, Delete, Param, Patch } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';

import { AdminGuard } from '../common/guards/admin.guard';
import { CreateAccessKeyDto } from 'src/dto/create-access-key.dto';
import { UpdateAccessKeyDto } from 'src/dto/update-access-key.dto';

@Controller('admin/keys')
@UseGuards(AdminGuard)
export class AccessKeyController {
  constructor(private readonly service: AccessKeyService) {}

  @Post()
  createKey(@Body() dto: CreateAccessKeyDto) {
    return this.service.createKey(dto);
  }

  @Get()
  listKeys() {
    return this.service.listKeys();
  }

  @Delete(':id')
  deleteKey(@Param('id') id: string) {
    return this.service.deleteKey(id);
  }

  @Patch(':id')
  updateKey(@Param('id') id: string, @Body() dto: UpdateAccessKeyDto) {
    return this.service.updateKey(id, dto);
  }
}
