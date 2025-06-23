import { getConnection, sql } from "../configs/db";
import { responseType } from "../types/common.servise.response";
import { paymentSchema, createPaymentRequest } from "../data-contracts/request/createpayment.request";
import PaymentResponse from "../data-contracts/response/payment.responce";
import { getPaymentsSchema, getPaymentsRequest } from "../data-contracts/request/getpayments.request";

let response:responseType;

export const createPaymentService = async (req:createPaymentRequest) =>{
    try {
            const zodResult = paymentSchema.safeParse(req);
            
            const data = zodResult.data;
            if(data){
                const pool = await getConnection();
                await pool.request()
                .input("payment_id", sql.Int, 0)
                .input("member_id", sql.Int, data.member_id)
                .input("amount", sql.Int, data.amount)
                .input("transaction_id", sql.VarChar, data.transaction_id)
                .input("status", sql.VarChar, data.status).execute("CreatePayment");
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
            err = "The record already exists, Duplicate transaction ID.";
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

export const getPaymentsService = async (req:getPaymentsRequest) =>{
     try {
        const zodResult = getPaymentsSchema.safeParse(req);
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
            .execute("GetPayments");
            const paymentData:PaymentResponse[] = result.recordset;            
            response = {
                success:true,
                data:paymentData
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

export const deletePaymentService = async (id:string) =>{
    try{
        const payment_id:number = parseInt(id);
        const pool = await getConnection();
        const result = await pool.request()
            .input("payment_id", sql.Int, payment_id)
            .execute("DeletePayment");
        if (result.rowsAffected[0] === 0) {
            let response:responseType = {
                success:false,
                error:{error:"Payment not found!"}
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

export const getPaymentByMember = async (id:string)=>{
    try{
        const member_id:number = parseInt(id);
        const pool = await getConnection();
        const result = await pool.request()
            .input("member_id", sql.Int, member_id)
            .execute("GetPaymentByMember");
        if (result.rowsAffected[0] === 0) {
            response = {
                success:false,
                error:{error:"Payments not found!"}
            }
            return response;
        }
        else{
            response = {
                success:true,
                data:result.recordset
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

export const updatePaymentService = async (id:string, req:createPaymentRequest) =>{
    try {
        const payment_id:number = parseInt(id);
        const zodResult = paymentSchema.safeParse(req);
        const data = zodResult.data;
        if(data){
            const pool = await getConnection();
            const result = await pool.request()
            .input("payment_id", sql.Int, payment_id)
            .input("member_id", sql.Int, data.member_id)
            .input("amount", sql.Int, data.amount)
            .input("transaction_id", sql.VarChar, data.transaction_id)
            .input("status", sql.VarChar, data.status).execute("CreatePayment");
            if (!result.rowsAffected[0]) {
                response = {
                    success:false,
                    error:{error: "Payment not found. Update failed!"}
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
            err = "The record already exists, Duplicate transaction ID.";
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