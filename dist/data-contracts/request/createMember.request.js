"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSchema = void 0;
const zod_1 = require("zod");
// member input
exports.memberSchema = zod_1.z.object({
    member_name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    phone_no: zod_1.z.string().regex(/^\d{10}$/, "Phone number must be 10 digits").optional()
}).strict();
