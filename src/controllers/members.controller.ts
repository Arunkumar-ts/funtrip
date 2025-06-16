import { NextFunction, Request, Response } from "express";
import { getConnection, sql } from "../configs/db";
import { memberSchema } from "../data-contracts/request/member.request";
import CommonResponse from "../data-contracts/response/common.response";
import MemberResponse from "../data-contracts/response/member.response";

export const getAllMembers = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const pool = await getConnection();
        const result = await pool.request().execute("GetMembers");
        const member:MemberResponse[] = result.recordset;

        res.status(200).json(CommonResponse.success(200, member , "Members fetched successfully"));
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Error", error as object));
    }
}

export const GetSingleMember = async (req:Request, res:Response, next:NextFunction)=>{
    const member_id:number = parseInt(req.params.id);
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetSingleMember");
        const member:MemberResponse[] = result.recordset;
        
        if (result.rowsAffected[0] === 0) {
            const error:object = {error :"Member not found"};
            res.status(404).json(CommonResponse.error(404, "Failed to fetch member", error));
        }
        res.status(200).json(CommonResponse.success(200, member, "Member fetched successfully"));
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Error", error as object));
    }
}

export const CreateMember = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const zodResult = memberSchema.safeParse(req.body);
        console.log(req.body);
        const data = zodResult.data;
        
        if(data){
            const pool = await getConnection();
            await pool.request()
            .input("member_name", sql.VarChar, data.member_name)
            .input("email", sql.VarChar, data.email)
            .input("phone_no", sql.VarChar, data.phone_no).execute("CreateMember");
            res.status(201).json(CommonResponse.success(200, null, "Members added successfully"));
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Invalid input", zodResult.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Error", error as object));
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
                const error:object = {error :"Member not found"};
                res.status(404).json(CommonResponse.error(404, "Error", error));
            }
        res.status(200).json(CommonResponse.success(200, null, "Member updated successfully"));
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Invalid input", zodResult.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Error", error as object));
    }
}

export const DeleteMember = async (req:Request, res:Response, next:NextFunction)=>{
    const member_id:number = parseInt(req.params.id);
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            const error:object = {error :"Member not found"};
            res.status(404).json(CommonResponse.error(404, "Error", error));
        }
        res.status(200).json(CommonResponse.success(200, null, "Member deleted successfully"));
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Error", error as object));
    }
}