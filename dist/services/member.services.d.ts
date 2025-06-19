import { createMemberRequest } from "../data-contracts/request/createmember.request";
import { GetMemberRequest } from "../data-contracts/request/getmemberlist.request";
export interface responseType {
    success: boolean;
    data?: object;
    error?: object;
}
export declare const getMembersService: (req: GetMemberRequest) => Promise<responseType>;
export declare const getMemberService: (id: string) => Promise<responseType>;
export declare const createMemberService: (req: createMemberRequest) => Promise<responseType>;
export declare const updateMemberService: (id: string, req: createMemberRequest) => Promise<responseType>;
export declare const deleteMemberService: (id: string) => Promise<responseType>;
