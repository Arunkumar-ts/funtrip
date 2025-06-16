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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMember = exports.UpdateMember = exports.CreateMember = exports.GetSingleMember = exports.getAllMembers = void 0;
const db_1 = require("../configs/db");
const types_1 = require("../types");
const common_response_1 = __importDefault(require("../data-contracts/response/common.response"));
const getAllMembers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request().execute("GetMembers");
        // res.status(200).json(members.recordset);
        res.status(200).json(common_response_1.default.success(200, result.recordset, "Members fetched successfully"));
    }
    catch (error) {
        // next(error);
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.getAllMembers = getAllMembers;
const GetSingleMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id).execute("GetSingleMember");
        if (result.rowsAffected[0] === 0) {
            const error = { error: "Member not found" };
            res.status(404).json(common_response_1.default.error(404, "Failed to fetch member", error));
        }
        res.status(200).json(common_response_1.default.success(200, result.recordset, "Member fetched successfully"));
    }
    catch (error) {
        // next(error)
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.GetSingleMember = GetSingleMember;
const CreateMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodResult = types_1.memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if (data) {
            const pool = yield (0, db_1.getConnection)();
            yield pool.request()
                .input("member_name", db_1.sql.VarChar, data.member_name)
                .input("email", db_1.sql.VarChar, data.email)
                .input("phone_no", db_1.sql.VarChar, data.phone_no).execute("CreateMember");
            res.status(201).json(common_response_1.default.success(200, null, "Members added successfully"));
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Invalid input", zodResult.error));
            // throw new Error("Validation failed");
        }
    }
    catch (error) {
        // next(error);
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.CreateMember = CreateMember;
const UpdateMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    try {
        const zodResult = types_1.memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if (data && member_id) {
            const pool = yield (0, db_1.getConnection)();
            const result = yield pool.request()
                .input("member_id", db_1.sql.Int, member_id)
                .input("member_name", db_1.sql.VarChar, data.member_name)
                .input("email", db_1.sql.VarChar, data.email)
                .input("phone_no", db_1.sql.VarChar, data.phone_no).execute("CreateMember");
            if (result.rowsAffected[0] === 0) {
                // throw new Error("Member not found");
                const error = { error: "Member not found" };
                res.status(404).json(common_response_1.default.error(404, "Error", error));
            }
            res.status(200).json(common_response_1.default.success(200, result.recordset, "Member updated successfully"));
            // res.status(201).json({ message: "Member updated successfully" });
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Invalid input", zodResult.error));
            // throw new Error("Validation failed");
        }
    }
    catch (error) {
        // next(error);
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.UpdateMember = UpdateMember;
const DeleteMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            // throw new Error("Member not found");
            const error = { error: "Member not found" };
            res.status(404).json(common_response_1.default.error(404, "Error", error));
        }
        res.status(200).json(common_response_1.default.success(200, null, "Member deleted successfully"));
        // res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        // next(error);
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.DeleteMember = DeleteMember;
