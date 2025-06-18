"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberService = exports.updateMemberService = exports.createMemberService = exports.getMemberService = exports.getMembersService = void 0;
const db_1 = require("../configs/db");
const getmemberlist_request_1 = require("../data-contracts/request/getmemberlist.request");
const createmembers_request_1 = require("../data-contracts/request/createmembers.request");
let responce;
const getMembersService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodResult = getmemberlist_request_1.getmemberSchema.safeParse(req.body);
        const data = zodResult.data;
        if (data) {
            const offset = data.pageIndex * data.pageSize;
            const pool = yield (0, db_1.getConnection)();
            const result = yield pool.request()
                .input("pageSize", db_1.sql.Int, data.pageSize)
                .input("offset", db_1.sql.Int, offset)
                .input("sortBy", db_1.sql.VarChar, data.sortBy)
                .input("sortOn", db_1.sql.VarChar, data.sortOn)
                .input("searchString", db_1.sql.VarChar, data.searchString)
                .execute("GetMembers");
            const memberData = result.recordset;
            responce = {
                success: true,
                data: memberData
            };
            return responce;
        }
        else {
            const error = zodResult.error.errors[0].message;
            responce = {
                success: false,
                error: { error }
            };
            return responce;
        }
    }
    catch (error) {
        responce = {
            success: false,
            error
        };
        return responce;
    }
});
exports.getMembersService = getMembersService;
const getMemberService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member_id = parseInt(req.params.id);
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id).execute("GetMember");
        if (result.rowsAffected[0] === 0) {
            responce = {
                success: false,
                error: { error: "Member not found!" }
            };
            return responce;
        }
        else {
            const responceData = result.recordset;
            responce = {
                success: true,
                data: responceData
            };
            return responce;
        }
    }
    catch (error) {
        responce = {
            success: false,
            error: { error }
        };
        return responce;
    }
});
exports.getMemberService = getMemberService;
const createMemberService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodResult = createmembers_request_1.memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if (data) {
            const pool = yield (0, db_1.getConnection)();
            const result = yield pool.request()
                .input("member_id", db_1.sql.VarChar, 0)
                .input("member_name", db_1.sql.VarChar, data.member_name)
                .input("email", db_1.sql.VarChar, data.email)
                .input("phone_no", db_1.sql.VarChar, data.phone_no).execute("CreateMember");
            console.log(result);
            responce = {
                success: true
            };
            return responce;
        }
        else {
            const error = zodResult.error.errors[0].message;
            responce = {
                success: false,
                error: { error }
            };
            return responce;
        }
    }
    catch (error) {
        let err;
        if (error.number === 2627) {
            err = "The record already exists, Duplicate email or phone number.";
        }
        else {
            err = `Internal server error: ${error.message || JSON.stringify(error)}`;
        }
        responce = {
            success: false,
            error: { error: err }
        };
        return responce;
    }
});
exports.createMemberService = createMemberService;
const updateMemberService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member_id = parseInt(req.params.id);
        if (isNaN(member_id)) {
            responce = {
                success: false,
                error: { error: "Invalid member ID. It must be a number." }
            };
            return responce;
        }
        const zodResult = createmembers_request_1.memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if (data) {
            const pool = yield (0, db_1.getConnection)();
            const result = yield pool.request()
                .input("member_id", db_1.sql.Int, member_id)
                .input("member_name", db_1.sql.VarChar, data.member_name)
                .input("email", db_1.sql.VarChar, data.email)
                .input("phone_no", db_1.sql.VarChar, data.phone_no).execute("CreateMember");
            if (!result.rowsAffected[0]) {
                responce = {
                    success: false,
                    error: { error: "Member not found. Update failed!" }
                };
                return responce;
            }
            else {
                responce = {
                    success: true
                };
                return responce;
            }
        }
        else {
            const error = zodResult.error.errors[0].message;
            responce = {
                success: false,
                error: { error }
            };
            return responce;
        }
    }
    catch (error) {
        let err;
        if (error.number === 2627) {
            err = "Duplicate email or phone number, likely the record already exists.";
        }
        else {
            err = `Internal server error: ${error.message || JSON.stringify(error)}`;
        }
        responce = {
            success: false,
            error: { error: err }
        };
        return responce;
    }
});
exports.updateMemberService = updateMemberService;
const deleteMemberService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member_id = parseInt(req.params.id);
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            responce = {
                success: false,
                error: { error: "Member not found!" }
            };
            return responce;
        }
        else {
            responce = {
                success: true,
            };
            return responce;
        }
    }
    catch (error) {
        responce = {
            success: false,
            error: { error }
        };
        return responce;
    }
});
exports.deleteMemberService = deleteMemberService;
