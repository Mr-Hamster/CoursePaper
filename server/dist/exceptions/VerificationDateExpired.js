"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class VerificationDateExpired extends HttpException_1.default {
    constructor() {
        super(401, 'Verification date has been expired!');
    }
}
exports.default = VerificationDateExpired;
//# sourceMappingURL=VerificationDateExpired.js.map