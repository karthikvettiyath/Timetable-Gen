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
exports.ClassGroupController = void 0;
const common_1 = require("@nestjs/common");
const class_group_service_1 = require("./class-group.service");
const create_class_group_dto_1 = require("./dto/create-class-group.dto");
const update_class_group_dto_1 = require("./dto/update-class-group.dto");
let ClassGroupController = class ClassGroupController {
    classGroupService;
    constructor(classGroupService) {
        this.classGroupService = classGroupService;
    }
    create(createClassGroupDto) {
        return this.classGroupService.create(createClassGroupDto);
    }
    findAll() {
        return this.classGroupService.findAll();
    }
    findOne(id) {
        return this.classGroupService.findOne(id);
    }
    update(id, updateClassGroupDto) {
        return this.classGroupService.update(id, updateClassGroupDto);
    }
    remove(id) {
        return this.classGroupService.remove(id);
    }
};
exports.ClassGroupController = ClassGroupController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_class_group_dto_1.CreateClassGroupDto]),
    __metadata("design:returntype", void 0)
], ClassGroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassGroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassGroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_class_group_dto_1.UpdateClassGroupDto]),
    __metadata("design:returntype", void 0)
], ClassGroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassGroupController.prototype, "remove", null);
exports.ClassGroupController = ClassGroupController = __decorate([
    (0, common_1.Controller)('class-group'),
    __metadata("design:paramtypes", [class_group_service_1.ClassGroupService])
], ClassGroupController);
//# sourceMappingURL=class-group.controller.js.map