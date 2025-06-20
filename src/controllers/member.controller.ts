import CommonResponse from "../data-contracts/response/common.response";
import { 
  getMemberService,
  getMembersService,
  createMemberService,
  updateMemberService,
  deleteMemberService
} from "../services/member.services";
import { Controller, Get, Post, Route, Tags, Path, Body, Put, Delete} from 'tsoa';
import { GetMemberRequest } from "../data-contracts/request/getmembers.request";
import { createMemberRequest } from "../data-contracts/request/createmember.request";
import { responseType } from "../types/common.servise.response";

@Route('member')
@Tags('Member')

export class MemberController extends Controller {
    @Get('{id}')
    public async getMember( 
      @Path() id:string 
    ): Promise<object> {
      try {
        const result: responseType = await getMemberService(id);
        if (result.success) {
          return CommonResponse.success(200, result.data, "Member fetched successfully");
        } else {
          return CommonResponse.error(400, "Failed to fetch member.", result.error);
        }
      } catch (error) {
        return CommonResponse.error(500, "Internal error", error as object);
      }
    }

    @Post('/list')
    public async getMembers(
      @Body() body: GetMemberRequest,
    ): Promise<object> {
        try {
          const result:responseType = await getMembersService(body);
          if(result.success){
              return CommonResponse.success(200, result.data, "Members fetched successfully");
          }
          else{
              return CommonResponse.error(400, "Failed to fetch members.", result.error);
          }
      } catch (error) {
          return CommonResponse.error(500, "Internal error", error as object);
      }
    }

    @Post('/')
    public async createMember(
      @Body() body: createMemberRequest,
    ): Promise<object> {
        try {
          const result:responseType = await createMemberService(body);
          if(result.success){
              return CommonResponse.success(200, result.data, "Member created successfully");
          }
          else{
              return CommonResponse.error(400, "Failed to create member.", result.error);
          }
      } catch (error) {
          return CommonResponse.error(500, "Internal error", error as object);
      }
    }

    @Put('{id}')
    public async updateMember(
      @Path() id:string,
      @Body() body: createMemberRequest
    ): Promise<object> {
      try {
        const result: responseType = await updateMemberService(id, body);
        if (result.success) {
          return CommonResponse.success(200, result.data, "Member updated successfully");
        } else {
          return CommonResponse.error(400, "Failed to update member.", result.error);
        }
      } catch (error) {
        return CommonResponse.error(500, "Internal error", error as object);
      }
    }

    @Delete('{id}')
    public async deleteMember( 
      @Path() id:string 
    ): Promise<object> {
      try {
        const result: responseType = await deleteMemberService(id);
        if (result.success) {
          return CommonResponse.success(200, result.data, "Member deleted successfully");
        } else {
          return CommonResponse.error(400, "Failed to delete member.", result.error);
        }
      } catch (error) {
        return CommonResponse.error(500, "Internal error", error as object);
      }
    }
}