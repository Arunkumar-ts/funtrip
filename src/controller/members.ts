import { NextFunction, Request, Response } from "express";
import { getConnection, sql } from "../configs/db";
import {memberSchema} from "../types";

export const getAllMembers = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const pool = await getConnection();
        const result = await pool.request().execute("GetMembers");
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error);
    }
}

export const GetSingleMember = async (req:Request, res:Response, next:NextFunction)=>{
    const member_id:number = parseInt(req.params.id);
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetSingleMember");
        if (result.rowsAffected[0] === 0) {
            const error = new Error("Member not found") as any;
            error.status = 404;
            throw error;
        }
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error)
    }
}

export const CreateMember = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const zodResult = memberSchema.safeParse(req.body);
        const data = zodResult.data;
        
        if(data){
            const pool = await getConnection();
            await pool.request()
            .input("member_name", sql.VarChar, data.member_name)
            .input("email", sql.VarChar, data.email)
            .input("phone_no", sql.VarChar, data.phone_no).execute("CreateMember");
            res.status(201).json({ message: "Member added successfully" });
        }
        else{
            throw new Error("Validation failed");
        }
    } catch (error) {
        next(error);
    }
}

export const UpdateMember = async (req:Request, res:Response, next:NextFunction)=>{
    const member_id:number = parseInt(req.params.id);
    try {
        const zodResult = memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if(data && member_id){
            const pool = await getConnection();
            const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .input("member_name", sql.VarChar, data.member_name)
            .input("email", sql.VarChar, data.email)
            .input("phone_no", sql.VarChar, data.phone_no).execute("CreateMember");
            if (result.rowsAffected[0] === 0) {
                throw new Error("Member not found");
            }
            res.status(201).json({ message: "Member updated successfully" });
        }
        else{
            throw new Error("Validation failed");
        }
    } catch (error) {
        next(error);
    }
}

export const DeleteMember = async (req:Request, res:Response, next:NextFunction)=>{
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
            .input("member_id", sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        next(error);
    }
}