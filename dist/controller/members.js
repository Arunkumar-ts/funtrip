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
const validator_1 = __importDefault(require("validator"));
const getAllMembers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request().execute("GetMembers");
        res.status(200).json(result.recordset);
    }
    catch (error) {
        next(error);
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
            const error = new Error("Member not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json(result.recordset);
    }
    catch (error) {
        next(error);
    }
});
exports.GetSingleMember = GetSingleMember;
const CreateMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { member_name, email, phone_no } = req.body;
    if (!member_name || !email) {
        throw new Error("Name and email are required");
    }
    if (!validator_1.default.isEmail(email)) {
        throw new Error('Invalid email format');
    }
    if ((phone_no === null || phone_no === void 0 ? void 0 : phone_no.length) !== 10) {
        throw new Error("Phone number is invalid!");
    }
    try {
        const pool = yield (0, db_1.getConnection)();
        yield pool.request()
            .input("member_name", db_1.sql.VarChar, member_name)
            .input("email", db_1.sql.VarChar, email)
            .input("phone_no", db_1.sql.VarChar, phone_no).execute("AddMember");
        res.status(201).json({ message: "Member added successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.CreateMember = CreateMember;
const UpdateMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    const { member_name, email, phone_no } = req.body;
    if (!member_name || !email) {
        throw new Error("Name and email are required");
    }
    if (!validator_1.default.isEmail(email)) {
        throw new Error('Invalid email format');
    }
    if ((phone_no === null || phone_no === void 0 ? void 0 : phone_no.length) !== 10) {
        throw new Error("Phone number is invalid!");
    }
    try {
        const pool = yield (0, db_1.getConnection)();
        const resultMember = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id).execute("GetSingleMember");
        if (resultMember.rowsAffected[0] === 0) {
            const error = new Error("Member not found");
            error.status = 404;
            throw error;
        }
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id)
            .input("member_name", db_1.sql.VarChar(100), member_name)
            .input("email", db_1.sql.VarChar(100), email)
            .input("phone_no", db_1.sql.VarChar(15), phone_no)
            .execute("UpdateMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(201).json({ message: "Member updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateMember = UpdateMember;
const DeleteMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    try {
        const pool = yield (0, db_1.getConnection)();
        const resultMember = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id).execute("GetSingleMember");
        if (resultMember.rowsAffected[0] === 0) {
            const error = new Error("Member not found");
            error.status = 404;
            throw error;
        }
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteMember = DeleteMember;
