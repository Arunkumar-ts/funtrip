import { NextFunction, Request, Response } from "express";
import { getConnection, sql } from "../configs/db";

interface PaymentInput {
  amount:number,
  member_id:number,
  transaction_id:string,
  status:string
}

export const GetAllPayments = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const pool = await getConnection();
        const result = await pool.request().execute("GetAllPayments");
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error);
    }
}

export const GetSingleMemberPayments = async(req:Request, res:Response, next:NextFunction)=>{
    const member_id:number = parseInt(req.params.id);
    try {
        const pool = await getConnection();

        const resultMember = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetSingleMember");
        if (resultMember.rowsAffected[0] === 0) {
            const error = new Error("Member not found") as any;
            error.status = 404;
            throw error;
        }

        const result = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetSingleMemberPayments");
        if (result.rowsAffected[0] === 0) {
            throw new Error( "Member or Payments not found");
        }
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error)
    }
}

export const CreatePayment = async (req:Request, res:Response, next:NextFunction)=>{
    const member_id:number = parseInt(req.params.id);
    const { amount, transaction_id, status}: PaymentInput = req.body;
    if (!amount || !member_id || !transaction_id || !status ) {
        throw new Error("Amount and Member_id and Transaction_id and Status are required");
    }
    try {
        const pool = await getConnection();

        const result = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetSingleMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error( "Member not found");
        }

        await pool.request()
        .input("amount", sql.Decimal(10, 2), amount)
        .input("member_id", sql.Int, member_id)
        .input("transaction_id", sql.VarChar(100), transaction_id)
        .input("status", sql.VarChar(50), status)
        .execute("CreatePayment");
        res.status(201).json({ message: "Payment added successfully" });
    } catch (error) {
        next(error);
    }
}
