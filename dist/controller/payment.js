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
exports.CreatePayment = exports.GetSingleMemberPayments = exports.GetAllPayments = void 0;
const db_1 = require("../configs/db");
const GetAllPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request().execute("GetAllPayments");
        res.status(200).json(result.recordset);
    }
    catch (error) {
        next(error);
    }
});
exports.GetAllPayments = GetAllPayments;
const GetSingleMemberPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    try {
        const pool = yield (0, db_1.getConnection)();
        const resultMember = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id).execute("GetSingleMember");
        if (resultMember.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id).execute("GetSingleMemberPayments");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member or Payments not found");
        }
        res.status(200).json(result.recordset);
    }
    catch (error) {
        next(error);
    }
});
exports.GetSingleMemberPayments = GetSingleMemberPayments;
const CreatePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member_id = parseInt(req.params.id);
    const { amount, transaction_id, status } = req.body;
    if (!amount || !member_id || !transaction_id || !status) {
        throw new Error("Amount and Member_id and Transaction_id and Status are required");
    }
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield pool.request()
            .input("member_id", db_1.sql.Int, member_id).execute("GetSingleMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        yield pool.request()
            .input("amount", db_1.sql.Decimal(10, 2), amount)
            .input("member_id", db_1.sql.Int, member_id)
            .input("transaction_id", db_1.sql.VarChar(100), transaction_id)
            .input("status", db_1.sql.VarChar(50), status)
            .execute("CreatePayment");
        res.status(201).json({ message: "Payment added successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.CreatePayment = CreatePayment;
