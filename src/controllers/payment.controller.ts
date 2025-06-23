import CommonResponse from "../data-contracts/response/common.response";
import { Controller, Route, Tags, Post, Body, Delete, Path, Get, Put} from 'tsoa';
import { createPaymentRequest } from "../data-contracts/request/createpayment.request";
import { 
    createPaymentService, 
    getPaymentsService, 
    deletePaymentService, 
    getPaymentByMemberService,
    updatePaymentService 
} from "../services/payment.services";
import { responseType } from "../types/common.servise.response";
import { getPaymentsRequest } from "../data-contracts/request/getpayments.request";

@Route('payment')
@Tags('Payment')

export class PaymentController extends Controller {

    @Get('/ByMember/{id}')
    public async getPaymentByMember( 
        @Path() id:string 
    ): Promise<object> {
        try {
        const result: responseType = await getPaymentByMemberService(id);
        if (result.success) {
            return CommonResponse.success(200, result.data, "Payments fetched successfully");
        } else {
            return CommonResponse.error(400, "Failed to fetch Payments.", result.error);
        }
        } catch (error) {
        return CommonResponse.error(500, "Internal error", error as object);
        }
    }
    
    @Post('/')
    public async createPayment(
        @Body() body: createPaymentRequest,
    ): Promise<object> {
        try {
            const result:responseType = await createPaymentService(body);
            if(result.success){
                return CommonResponse.success(200, result.data, "Payment added successfully");
            }
            else{
                return CommonResponse.error(400, "Failed to add Payment.", result.error);
            }
        } catch (error) {
            return CommonResponse.error(500, "Internal error", error as object);
        }
    }

    @Post("/list")
    public async getPayments(
        @Body() body: getPaymentsRequest,
    ): Promise<object>{
        try {
            const result:responseType = await getPaymentsService(body);
            if(result.success){
                return CommonResponse.success(200, result.data, "Payments fetched successfully");
            }
            else{
                return CommonResponse.error(400, "Failed to fetch Payments.", result.error);
            }
        } catch (error) {
            return CommonResponse.error(500, "Internal error", error as object);
        }
    }

    @Put('{id}')
    public async updatePayment(
        @Path() id:string,
        @Body() body: createPaymentRequest
    ): Promise<object> {
        try {
        const result: responseType = await updatePaymentService(id, body);
        if (result.success) {
            return CommonResponse.success(200, result.data, "Payment updated successfully");
        } else {
            return CommonResponse.error(400, "Failed to update payment.", result.error);
        }
        } catch (error) {
        return CommonResponse.error(500, "Internal error", error as object);
        }
    }

    @Delete('{id}')
    public async deletePayment( 
      @Path() id:string 
    ): Promise<object> {
      try {
        const result: responseType = await deletePaymentService(id);
        if (result.success) {
          return CommonResponse.success(200, result.data, "Payment deleted successfully");
        } else {
          return CommonResponse.error(400, "Failed to delete payment.", result.error);
        }
      } catch (error) {
        return CommonResponse.error(500, "Internal error", error as object);
      }
    }

}