import { getConnection, sql } from "../configs/db";
import { Request} from "express";
import { getmemberSchema } from "../data-contracts/request/getmemberlist.request";
import MemberResponse from "../data-contracts/response/memberlist.response";
import { memberSchema } from "../data-contracts/request/createmembers.request";

export interface responseType {
    success:boolean,
    data?:object,
    error?:object
}

let responce:responseType;

export const getMembersService = async (req:Request) => {
    try {
        const zodResult = getmemberSchema.safeParse(req.body);
        const data = zodResult.data;
        if(data){
            const offset = data.pageIndex * data.pageSize;
            const pool = await getConnection();
            const result = await pool.request()
            .input("pageSize", sql.Int, data.pageSize )
            .input("offset", sql.Int, offset)
            .input("sortBy", sql.VarChar, data.sortBy )
            .input("sortOn", sql.VarChar, data.sortOn )
            .input("searchString", sql.VarChar, data.searchString)
            .execute("GetMembers");
            const memberData:MemberResponse[] = result.recordset;            
            responce = {
                success:true,
                data:memberData
            }
            return responce;
        }
        else{
            const error = zodResult.error.errors[0].message ;
            responce = {
                success:false,
                error:{error}
            }
            return responce;
        }
    } catch (error:any) {
        responce = {
            success:false,
            error
        }
        return responce
    }
}

export const getMemberService = async (req:Request) => {
    try {
        const member_id:number = parseInt(req.params.id);
        const pool = await getConnection();
        const result = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetMember");
        if (result.rowsAffected[0] === 0) {
            responce = {
                success:false,
                error:{error:"Member not found!"}
            }
            return responce;
        }
        else{
            const responceData:MemberResponse[] = result.recordset;
            responce = {
                success:true,
                data:responceData
            }
            return responce;
        }
    } catch (error:any) {
        responce = {
            success:false,
            error:{error}
        }
        return responce
    }
}

export const createMemberService = async (req:Request) =>{
    try {
        const zodResult = memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if(data){
            const pool = await getConnection();
            await pool.request()
            .input("member_id", sql.Int, 0)
            .input("member_name", sql.VarChar, data.member_name)
            .input("email", sql.VarChar, data.email)
            .input("phone_no", sql.VarChar, data.phone_no).execute("CreateMember");
            responce = {
                success:true
            }
            return responce;
        }
        else{
            const error = zodResult.error.errors[0].message ;
            responce = {
                success:false,
                error:{error}
            }
            return responce;
        }
    } catch (error:any) {
        let err;
        if (error.number === 2627) {
            err = "The record already exists, Duplicate email or phone number.";
        } else {
            err = `Internal server error: ${error.message || JSON.stringify(error)}`;
        }
        
        responce = {
            success:false,
            error:{error : err}
        }
        return responce
    }
}

export const updateMemberService = async (req:Request) =>{
    try {
        const member_id:number = parseInt(req.params.id);
        if(isNaN(member_id)){
            responce = {
                success:false,
                error:{error: "Invalid member ID. It must be a number."}
            }
            return responce;
        }
        const zodResult = memberSchema.safeParse(req.body);
        const data = zodResult.data;
        if(data){
            const pool = await getConnection();
            const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .input("member_name", sql.VarChar, data.member_name)
            .input("email", sql.VarChar, data.email)
            .input("phone_no", sql.VarChar, data.phone_no).execute("CreateMember");
            if (!result.rowsAffected[0]) {
                responce = {
                    success:false,
                    error:{error: "Member not found. Update failed!"}
                }
                return responce;
            }
            else{
                responce = {
                    success:true
                }
                return responce;
            }
        }
        else{
            const error = zodResult.error.errors[0].message ;
            responce = {
                success:false,
                error:{error}
            }
            return responce;
        }
    } catch (error:any) {
        let err;
        if (error.number === 2627) {
            err = "Duplicate email or phone number, likely the record already exists.";
        } else {
            err = `Internal server error: ${error.message || JSON.stringify(error)}`;
        }
        
        responce = {
            success:false,
            error:{error : err}
        }
        return responce
    }
}

export const deleteMemberService = async (req:Request) =>{
    try{
        const member_id:number = parseInt(req.params.id);
        const pool = await getConnection();
        const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            responce = {
                success:false,
                error:{error:"Member not found!"}
            }
            return responce;
        }
        else{
            responce = {
                success:true,
            }
            return responce;
        }

    }catch(error:any){
        responce = {
            success:false,
            error:{error}
        }
        return responce
    }
}
