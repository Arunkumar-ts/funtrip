import { NextFunction, Request, Response } from "express";
import { getConnection, sql } from "../configs/db";
import validator from 'validator';

interface FriendInput {
  member_name: string;
  email: string;
  phone_no?: string;
}

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
            throw new Error( "Member not found");
        }
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error)
    }
}

export const CreateMember = async (req:Request, res:Response, next:NextFunction)=>{
    const { member_name, email, phone_no }: FriendInput = req.body;
    if (!member_name || !email ) {
        throw new Error("Name and email are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }
    if(phone_no?.length !==10){
        throw new Error("Phone number is invalid!");        
    }
    try {
        const pool = await getConnection();
        await pool.request()
        .input("member_name", sql.VarChar, member_name)
        .input("email", sql.VarChar, email)
        .input("phone_no", sql.VarChar, phone_no).execute("AddMember");
        res.status(201).json({ message: "Member added successfully" });
    } catch (error) {
        next(error);
    }
}

export const UpdateMember = async (req:Request, res:Response, next:NextFunction)=>{
    const member_id:number = parseInt(req.params.id);
    const { member_name, email, phone_no }: FriendInput = req.body;
    if (!member_name || !email ) {
        throw new Error("Name and email are required");
    }
    try {
        const pool = await getConnection();

        const resultMember = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetSingleMember");
        if (resultMember.rowsAffected[0] === 0) {
            throw new Error( "Member not found");
        }

        const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .input("member_name", sql.VarChar(100), member_name)
            .input("email", sql.VarChar(100), email)
            .input("phone_no", sql.VarChar(15), phone_no)
            .execute("UpdateMember");

        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(201).json({ message: "Member updated successfully" });
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
            throw new Error( "Member not found");
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