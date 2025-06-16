"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonResponse {
    constructor(code, message, data, errors) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
    static success(code = 200, data = null, message = 'Success') {
        return new CommonResponse(code, message, data, null);
    }
    static error(code = 500, message = 'Error', errors = null) {
        return new CommonResponse(code, message, null, errors);
    }
}
exports.default = CommonResponse;
