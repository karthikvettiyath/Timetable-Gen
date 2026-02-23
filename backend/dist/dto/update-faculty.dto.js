"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFacultyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_faculty_dto_1 = require("./create-faculty.dto");
class UpdateFacultyDto extends (0, mapped_types_1.PartialType)(create_faculty_dto_1.CreateFacultyDto) {
}
exports.UpdateFacultyDto = UpdateFacultyDto;
//# sourceMappingURL=update-faculty.dto.js.map