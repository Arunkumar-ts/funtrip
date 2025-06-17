"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getmemberSchema = void 0;
const zod_1 = require("zod");
exports.getmemberSchema = zod_1.z.object({
    pageSize: zod_1.z.number().min(1, "pageSize must be at least 1"),
    pageIndex: zod_1.z.number(),
    searchString: zod_1.z.string().optional(),
    sortBy: zod_1.z.string()
        .transform((val) => val.toLowerCase())
        .refine((val) => ["member_id", "member_name", "email", "phone_no"].includes(val), {
        message: "Invalid sortBy field",
    }).optional().default("member_id"),
    sortOn: zod_1.z.string()
        .transform(val => val.toUpperCase())
        .refine(val => val === "ASC" || val === "DESC", {
        message: "sortOn must be either 'ASC' or 'DESC'",
    }).optional().default("ASC"),
}).strict();
