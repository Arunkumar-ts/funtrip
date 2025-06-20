import { responseType } from "../types/common.servise.response";
import { createPaymentRequest } from "../data-contracts/request/createpayment.request";
import { getPaymentsRequest } from "../data-contracts/request/getpayments.request";
export declare const createPaymentService: (req: createPaymentRequest) => Promise<responseType>;
export declare const getPaymentsService: (req: getPaymentsRequest) => Promise<responseType>;
export declare const deletePaymentService: (id: string) => Promise<responseType>;
export declare const getPaymentByMember: (id: string) => Promise<responseType>;
export declare const updatePaymentService: (id: string, req: createPaymentRequest) => Promise<responseType>;
