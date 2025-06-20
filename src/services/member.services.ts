import { getConnection, sql } from "../configs/db";
import { getmemberSchema } from "../data-contracts/request/getmembers.request";
import MemberResponse from "../data-contracts/response/memberlist.response";
import { memberSchema, createMemberRequest } from "../data-contracts/request/createmember.request";
import { GetMemberRequest } from "../data-contracts/request/getmembers.request";
import { responseType } from "../types/common.servise.response";

let response:responseType;

export const getMembersService = async (req:GetMemberRequest) => {
    try {
        const zodResult = getmemberSchema.safeParse(req);
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
            response = {
                success:true,
                data:memberData
            }
            return response;
        }
        else{
            const error = zodResult.error.errors[0].message ;
            response = {
                success:false,
                error:{error}
            }
            return response;
        }
    } catch (error:any) {
        response = {
            success:false,
            error
        }
        return response
    }
}

export const getMemberService = async (id:string) => {
    try {
        const member_id:number = parseInt(id);
        const pool = await getConnection();
        const result = await pool.request()
        .input("member_id", sql.Int, member_id).execute("GetMember");
        if (result.rowsAffected[0] === 0) {
            response = {
                success:false,
                error:{error:"Member not found!"}
            }
            return response;
        }
        else{
            const responseData:MemberResponse[] = result.recordset;
            response = {
                success:true,
                data:responseData
            }
            return response;
        }
    } catch (error:any) {
        response = {
            success:false,
            error:{error}
        }
        return response
    }
}

export const createMemberService = async (req:createMemberRequest) =>{
    try {
        const zodResult = memberSchema.safeParse(req);
        const data = zodResult.data;
        if(data){
            const pool = await getConnection();
            await pool.request()
            .input("member_id", sql.Int, 0)
            .input("member_name", sql.VarChar, data.member_name)
            .input("email", sql.VarChar, data.email)
            .input("phone_no", sql.VarChar, data.phone_no).execute("CreateMember");
            response = {
                success:true
            }
            return response;
        }
        else{
            const error = zodResult.error.errors[0].message ;
            response = {
                success:false,
                error:{error}
            }
            return response;
        }
    } catch (error:any) {
        let err:string;
        if (error.number === 2627) {
            err = "The record already exists, Duplicate email or phone number.";
        } else {
            err = `Internal server error: ${error.message || JSON.stringify(error)}`;
        }
        
        response = {
            success:false,
            error:{error : err}
        }
        return response
    }
}

export const updateMemberService = async (id:string, req:createMemberRequest) =>{
    try {
        const member_id:number = parseInt(id);
        if(isNaN(member_id)){
            response = {
                success:false,
                error:{error: "Invalid member ID. It must be a number."}
            }
            return response;
        }
        const zodResult = memberSchema.safeParse(req);
        const data = zodResult.data;
        if(data){
            const pool = await getConnection();
            const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .input("member_name", sql.VarChar, data.member_name)
            .input("email", sql.VarChar, data.email)
            .input("phone_no", sql.VarChar, data.phone_no).execute("CreateMember");
            if (!result.rowsAffected[0]) {
                response = {
                    success:false,
                    error:{error: "Member not found. Update failed!"}
                }
                return response;
            }
            else{
                response = {
                    success:true
                }
                return response;
            }
        }
        else{
            const error = zodResult.error.errors[0].message ;
            response = {
                success:false,
                error:{error}
            }
            return response;
        }
    } catch (error:any) {
        let err:string;
        if (error.number === 2627) {
            err = "Duplicate email or phone number, likely the record already exists.";
        } else {
            err = `Internal server error: ${error.message || JSON.stringify(error)}`;
        }
        
        response = {
            success:false,
            error:{error : err}
        }
        return response
    }
}

export const deleteMemberService = async (id:string) =>{
    try{
        const member_id:number = parseInt(id);
        const pool = await getConnection();
        const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            response = {
                success:false,
                error:{error:"Member not found!"}
            }
            return response;
        }
        else{
            response = {
                success:true,
            }
            return response;
        }

    }catch(error:any){
        response = {
            success:false,
            error:{error}
        }
        return response
    }
}
