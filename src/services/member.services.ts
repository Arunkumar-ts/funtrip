import { getConnection, sql } from "../configs/db";
import { Request} from "express";
import { getmemberSchema } from "../data-contracts/request/getmemberlist.request";
import MemberResponse from "../data-contracts/response/memberlist.response";

export interface responceType {
    success:boolean,
    data?:MemberResponse[],
    error?:object
}

let responce:responceType;

export const getMemberListService = async (req:Request) => {
    try {
        const zodResult = getmemberSchema.safeParse(req.body);
        const data = zodResult.data;
        if(data){
            const offset = data.pageIndex * data.pageSize;
            const pool = await getConnection();
            const result = await pool.request()
            .input("pageSize", sql.Int, data.pageSize)
            .input("offset", sql.Int, offset)
            .input("sortBy", sql.VarChar, data.sortBy)
            .input("sortOn", sql.VarChar, data.sortOn)
            .input("searchString", sql.VarChar, data.searchString)
            .execute("GetmembersList");
            
            responce = {
                success:true,
                data:result.recordset
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
    } catch (error) {
        responce = {
            success:false,
            error:{error}
        }
        return responce
    }
}

export const getSingleMemberService = async (req:Request) => {
    try {
        const member_id:number = parseInt(req.params.id);
        if(member_id){
            const pool = await getConnection();
            const result = await pool.request()
            .input("member_id", sql.Int, member_id).execute("GetSingleMember");
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
                    data:result.recordset
                }
                return responce;
            }
        }
        else{
            responce = {
                success:false,
                error:{error:"Make sure a valid ID is provided!"}
            }
            return responce;    
        }
    } catch (error) {
        responce = {
            success:false,
            error:{error}
        }
        return responce
    }
}