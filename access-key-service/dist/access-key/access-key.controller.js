"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessKeyController = void 0;
const common_1 = require("@nestjs/common");
const access_key_service_1 = require("./access-key.service");
const admin_guard_1 = require("../common/guards/admin.guard");
const create_access_key_dto_1 = require("../dto/create-access-key.dto");
const update_access_key_dto_1 = require("../dto/update-access-key.dto");
let AccessKeyController = class AccessKeyController {
    service;
    constructor(service) {
        this.service = service;
    }
    createKey(dto) {
        return this.service.createKey(dto);
    }
    listKeys() {
        return this.service.listKeys();
    }
    deleteKey(id) {
        return this.service.deleteKey(id);
    }
    updateKey(id, dto) {
        return this.service.updateKey(id, dto);
    }
};
exports.AccessKeyController = AccessKeyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_access_key_dto_1.CreateAccessKeyDto]),
    __metadata("design:returntype", void 0)
], AccessKeyController.prototype, "createKey", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccessKeyController.prototype, "listKeys", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessKeyController.prototype, "deleteKey", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_access_key_dto_1.UpdateAccessKeyDto]),
    __metadata("design:returntype", void 0)
], AccessKeyController.prototype, "updateKey", null);
exports.AccessKeyController = AccessKeyController = __decorate([
    (0, common_1.Controller)('admin/keys'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [access_key_service_1.AccessKeyService])
], AccessKeyController);
//# sourceMappingURL=access-key.controller.js.map