"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClassGroupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_class_group_dto_1 = require("./create-class-group.dto");
class UpdateClassGroupDto extends (0, mapped_types_1.PartialType)(create_class_group_dto_1.CreateClassGroupDto) {
}
exports.UpdateClassGroupDto = UpdateClassGroupDto;
//# sourceMappingURL=update-class-group.dto.js.map