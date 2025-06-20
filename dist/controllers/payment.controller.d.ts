import { Controller } from 'tsoa';
import { createPaymentRequest } from "../data-contracts/request/createpayment.request";
import { getPaymentsRequest } from "../data-contracts/request/getpayments.request";
export declare class PaymentController extends Controller {
    getPaymentByMember(id: string): Promise<object>;
    createPayment(body: createPaymentRequest): Promise<object>;
    getPayments(body: getPaymentsRequest): Promise<object>;
    updatePayment(id: string, body: createPaymentRequest): Promise<object>;
    deletePayment(id: string): Promise<object>;
}
