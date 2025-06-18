import { Request, Response } from "express";
import CommonResponse from "../data-contracts/response/common.response";
import { 
    responseType,
    getMembersService,
    getMemberService,
    createMemberService, 
    updateMemberService,
    deleteMemberService
} from "../services/member.services";

export const getMembers = async (req:Request, res:Response)=>{
    try {
        const result:responseType = await getMembersService(req);
        if(result.success){
            res.status(200).json(CommonResponse.success(200, result.data, "Members fetched successfully"));
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Failed to fetch members.", result.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Internal error", error as object));
    }

}

export const getMember = async (req:Request, res:Response)=>{
    try {
        const result:responseType = await getMemberService(req);
        if(result.success){
            res.status(200).json(CommonResponse.success(200, result.data , "Member fetched successfully"));
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Failed to fetch member.", result.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Internal error", error as object));
    }
}

export const createMember = async (req:Request, res:Response)=>{
    try{
        const result:responseType = await createMemberService(req);
        if(result.success){
            res.status(201).json(CommonResponse.success(201, result.data, "Member added successfully"));
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Failed to create member.", result.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Internal error", error as object));
    }
}

export const updateMember = async (req:Request, res:Response)=>{
    try{
        const result:responseType = await updateMemberService(req);
        if(result.success){
            res.status(201).json(CommonResponse.success(201, result.data, "Member updated successfully"));
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Failed to update member.", result.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Internal error", error as object));
    }
}

export const deleteMember = async (req:Request, res:Response)=>{
    try{
        const result:responseType = await deleteMemberService(req);
        if(result.success){
            res.status(201).json(CommonResponse.success(201, result.data, "Member deleted successfully"));
        }
        else{
            res.status(400).json(CommonResponse.error(400, "Failed to delete member.", result.error));
        }
    } catch (error) {
        res.status(500).json(CommonResponse.error(500, "Internal error", error as object));
    }
}