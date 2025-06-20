import { createMemberRequest } from "../data-contracts/request/createmember.request";
import { GetMemberRequest } from "../data-contracts/request/getmembers.request";
import { responseType } from "../types/common.servise.response";
export declare const getMembersService: (req: GetMemberRequest) => Promise<responseType>;
export declare const getMemberService: (id: string) => Promise<responseType>;
export declare const createMemberService: (req: createMemberRequest) => Promise<responseType>;
export declare const updateMemberService: (id: string, req: createMemberRequest) => Promise<responseType>;
export declare const deleteMemberService: (id: string) => Promise<responseType>;
