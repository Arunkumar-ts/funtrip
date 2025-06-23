import { getmemberSchema } from "../data-contracts/request/getmembers.request";
import { memberSchema, createMemberRequest } from "../data-contracts/request/createmember.request";
import { GetMemberRequest } from "../data-contracts/request/getmembers.request";
import { responseType } from "../types/common.servise.response";
import prisma from "../prisma";


let response:responseType;

export const getMembersService = async (req:GetMemberRequest) => {
    try {
        const zodResult = getmemberSchema.safeParse(req);
        const data = zodResult.data;
        if(data){
            const offset = data.pageIndex * data.pageSize;
            const members = await prisma.members.findMany({
                where: {
                    is_delete: false,
                    member_name: {
                        contains: data.searchString,
                    }
                },
                orderBy: {
                    [data.sortBy]: data.sortOn
                },
                skip: offset,
                take: data.pageSize
            });        
            response = {
                success:true,
                data:members
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
        const member = await prisma.members.findUnique({
            where: {
                is_delete: false,
                member_id
            }
        });
        if(member){
            response = {
                success:true,
                data:member as any
            }
        }  
        else{
            response = {
                success:false,
                error:{error:"Member not found!"}
            }
        }      
        return response;
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
            const newMember = await prisma.members.create({
                data: {
                    member_name:data.member_name,
                    email:data.email,
                    phone_no:data.phone_no,
                    created_on: new Date(),
                },
            });
            response = {
                success:true,
                data:newMember
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
        console.log(error);
        
        let err:string;
        if (error.code === 'P2002') {
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
        const zodResult = memberSchema.safeParse(req);
        const data = zodResult.data;
        if(data){
            const updateMember = await prisma.members.update({
                where: {
                    member_id,
                },
                data: {
                    member_name:data.member_name,
                    email:data.email,
                    phone_no:data.phone_no,
                    updated_on: new Date(),
                },
            });
            response = {
                success:true,
                data:updateMember
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
        if (error.code === 'P2002') {
            err = "Duplicate email or phone number, likely the record already exists.";
        } else if(error.code === 'P2025'){
            err = "Member not found!";
        }
        else{
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
        await prisma.members.update({
            where: {
                member_id,
            },
            data: {
                is_delete:true,
            },
        });
        response = {
            success:true,
        }        
        return response;
    }catch(error:any){
        let err:string;
        if(error.code === 'P2025'){
            err = "Member not found!";
        }
        else{
            err = `Internal server error: ${error.message || JSON.stringify(error)}`;
        }
        response = {
            success:false,
            error:{error : err}
        }
        return response
    }
}
