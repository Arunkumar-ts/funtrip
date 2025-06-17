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
exports.deleteMember = exports.updateMember = exports.createMember = exports.getSingleMember = exports.getAllMembers = void 0;
const db_1 = require("../configs/db");
const createmembers_request_1 = require("../data-contracts/request/createmembers.request");
const common_response_1 = __importDefault(require("../data-contracts/response/common.response"));
const member_services_1 = require("../services/member.services");
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, member_services_1.getMemberListService)(req);
        if (result.success) {
            res.status(200).json(common_response_1.default.success(200, result.data, "Members fetched successfully"));
        }
        else {
            res.status(500).json(common_response_1.default.error(500, "Error", result.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Internal error", error));
    }
});
exports.getAllMembers = getAllMembers;
const getSingleMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, member_services_1.getSingleMemberService)(req);
        if (result.success) {
            res.status(200).json(common_response_1.default.success(200, result.data, "Member fetched successfully"));
        }
        else {
            res.status(500).json(common_response_1.default.error(500, "Error", result.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Internal error", error));
    }
});
exports.getSingleMember = getSingleMember;
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodResult = createmembers_request_1.memberSchema.safeParse(req.body);
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
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.createMember = createMember;
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    try {
        const zodResult = createmembers_request_1.memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if (data && member_id) {
            const pool = yield (0, db_1.getConnection)();
            const result = yield pool.request()
                .input("member_id", db_1.sql.Int, member_id)
                .input("member_name", db_1.sql.VarChar, data.member_name)
                .input("email", db_1.sql.VarChar, data.email)
                .input("phone_no", db_1.sql.VarChar, data.phone_no).execute("CreateMember");
            if (result.rowsAffected[0] === 0) {
                const error = { error: "Member not found" };
                res.status(404).json(common_response_1.default.error(404, "Error", error));
            }
            else {
                res.status(200).json(common_response_1.default.success(200, null, "Member updated successfully"));
            }
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Invalid input", zodResult.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.updateMember = updateMember;
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            const error = { error: "Member not found" };
            res.status(404).json(common_response_1.default.error(404, "Error", error));
        }
        else {
            res.status(200).json(common_response_1.default.success(200, null, "Member deleted successfully"));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Error", error));
    }
});
exports.deleteMember = deleteMember;
