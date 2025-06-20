import { Controller } from 'tsoa';
import { GetMemberRequest } from "../data-contracts/request/getmembers.request";
import { createMemberRequest } from "../data-contracts/request/createmember.request";
export declare class MemberController extends Controller {
    getMember(id: string): Promise<object>;
    getMembers(body: GetMemberRequest): Promise<object>;
    createMember(body: createMemberRequest): Promise<object>;
    updateMember(id: string, body: createMemberRequest): Promise<object>;
    deleteMember(id: string): Promise<object>;
}
