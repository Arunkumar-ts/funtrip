import { Request, Response } from "express";
import { getConnection, sql } from "../configs/db";
import { memberSchema } from "../data-contracts/request/createmembers.request";

import CommonResponse from "../data-contracts/response/common.response";
import { getMemberListService, responceType, getSingleMemberService } from "../services/member.services";

export const getAllMembers = async (req:Request, res:Response)=>{
    try {
        const result:responceType = await getMemberListService(req);
        if(result.success){
            res.status(200).json(CommonResponse.success(200, result.data , "Members fetched successfully"));
        }
        else{
            res.status(500).json(CommonResponse.error(500, "Error", result.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Internal error", error as object));
    }
}

export const getSingleMember = async (req:Request, res:Response)=>{
    try {
        const result:responceType = await getSingleMemberService(req);
        if(result.success){
            res.status(200).json(CommonResponse.success(200, result.data , "Member fetched successfully"));
        }
        else{
            res.status(500).json(CommonResponse.error(500, "Error", result.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Internal error", error as object));
    }
}

export const createMember = async (req:Request, res:Response)=>{
    try {
        const zodResult = memberSchema.safeParse(req.body);
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

export const updateMember = async (req:Request, res:Response)=>{
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
            else{
                res.status(200).json(CommonResponse.success(200, null, "Member updated successfully"));
            }
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Invalid input", zodResult.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Error", error as object));
    }
}

export const deleteMember = async (req:Request, res:Response)=>{
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
        else{
            res.status(200).json(CommonResponse.success(200, null, "Member deleted successfully"));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Error", error as object));
    }
}