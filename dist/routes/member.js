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
const express_1 = __importDefault(require("express"));
const db_1 = require("../configs/db");
const router = express_1.default.Router();
// GET all members
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request().execute("GetMembers");
        res.status(200).json(result.recordset);
    }
    catch (error) {
        next(error);
    }
}));
// GET Single member
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, id).execute("GetSingleMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(200).json(result.recordset);
    }
    catch (error) {
        next(error);
    }
}));
// POST new member
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { member_name, email, phone_no } = req.body;
    if (!member_name || !email) {
        throw new Error("Name and email are required");
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
}));
// PUT update member
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { member_name, email, phone_no } = req.body;
    if (!member_name || !email) {
        throw new Error("Name and email are required");
    }
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, id)
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
}));
// DELETE delete member
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
