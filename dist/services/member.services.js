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
exports.getSingleMemberService = exports.getMemberListService = void 0;
const db_1 = require("../configs/db");
const getmemberlist_request_1 = require("../data-contracts/request/getmemberlist.request");
let responce;
const getMemberListService = (req) => __awaiter(void 0, void 0, void 0, function* () {
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
                .execute("GetmembersList");
            responce = {
                success: true,
                data: result.recordset
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
            error: { error }
        };
        return responce;
    }
});
exports.getMemberListService = getMemberListService;
const getSingleMemberService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member_id = parseInt(req.params.id);
        if (member_id) {
            const pool = yield (0, db_1.getConnection)();
            const result = yield pool.request()
                .input("member_id", db_1.sql.Int, member_id).execute("GetSingleMember");
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
                    data: result.recordset
                };
                return responce;
            }
        }
        else {
            responce = {
                success: false,
                error: { error: "Make sure a valid ID is provided!" }
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
exports.getSingleMemberService = getSingleMemberService;
