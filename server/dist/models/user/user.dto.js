"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3, {
        message: 'The minimum length for "username" is 3 characters',
    }),
    class_validator_1.MaxLength(16, {
        message: 'The maximum length for "username" is 16 characters',
    })
], CreateUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsEmail({}, {
        message: "This email is not correct, try again!"
    })
], CreateUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString()
], CreateUserDto.prototype, "password", void 0);
exports.default = CreateUserDto;
//# sourceMappingURL=user.dto.js.map