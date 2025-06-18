import { Request } from "express";
export interface responseType {
    success: boolean;
    data?: object;
    error?: object;
}
export declare const getMembersService: (req: Request) => Promise<responseType>;
export declare const getMemberService: (req: Request) => Promise<responseType>;
export declare const createMemberService: (req: Request) => Promise<responseType>;
export declare const updateMemberService: (req: Request) => Promise<responseType>;
export declare const deleteMemberService: (req: Request) => Promise<responseType>;
