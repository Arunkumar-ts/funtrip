import { responseType } from "../types/common.servise.response";
import { paymentSchema, createPaymentRequest } from "../data-contracts/request/createpayment.request";
import { getPaymentsSchema, getPaymentsRequest } from "../data-contracts/request/getpayments.request";
import prisma from "../prisma";

let response:responseType;

export const createPaymentService = async (req:createPaymentRequest) =>{
    try {
            const zodResult = paymentSchema.safeParse(req);
            
            const data = zodResult.data;
            if(data){
                const newPayment = await prisma.payments.create({
                    data: {
                        member_id:data.member_id,
                        amount:data.amount,
                        transaction_id:data.transaction_id,
                        status:data.status,
                        created_on: new Date(),
                    },
                })
                if(newPayment){
                    response = {
                        success:true,
                        data:newPayment
                    }
                    return response;
                }
                else{
                    response = {
                        success:false,
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
        if (error.code === 'P2002') {
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
            const payments = await prisma.payments.findMany({
                where: {
                    is_delete: false,
                    member: {
                        member_name: {
                            contains:data.searchString,
                        }
                    },
                },
                orderBy: {
                    [data.sortBy]: data.sortOn
                },
                skip: offset,
                take: data.pageSize,
                include: {
                    member: true
                }
            });
            response = {
                success:true,
                data:payments
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
        await prisma.payments.update({
            where: {
                payment_id,
            },
            data: {
                is_delete:true,
            },
        });
        response = {
            success:true,
        }
        return response    
    }catch(error:any){
        let err:string;
        if(error.code === 'P2025'){
            err = "No recoRd was found!";
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

export const getPaymentByMemberService = async (id:string)=>{
    try{
        const member_id:number = parseInt(id);
        const memberWithPayments = await prisma.payments.findMany({
            where: {
                member_id,
                is_delete:false
            },
            include: {
                member: true
            }
        });
        if(memberWithPayments.length>0){
            response = {
                success:true,
                data:memberWithPayments
            }
        }
        else{
            response = {
                success:false,
                error:{error:"Payment not found!"}
            }
        }
        return response
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
            const updatePayment = await prisma.payments.update({
                where: {
                    payment_id,
                },
                data: {
                    member_id:data.member_id,
                    amount:data.amount,
                    transaction_id:data.transaction_id,
                    status:data.status,
                    updated_on: new Date(),
                },
            });
            response = {
                success:true,
                data:updatePayment
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
            err = "The record already exists, Duplicate transaction ID.";
        } else if(error.code === 'P2025'){
            err = "No record was found!";
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