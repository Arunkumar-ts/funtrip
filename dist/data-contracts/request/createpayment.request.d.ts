import { z } from "zod";
export declare const paymentSchema: z.ZodObject<{
    member_id: z.ZodNumber;
    amount: z.ZodNumber;
    transaction_id: z.ZodString;
    status: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, "PAID" | "UNPAID", string>;
}, "strict", z.ZodTypeAny, {
    member_id: number;
    amount: number;
    transaction_id: string;
    status: "PAID" | "UNPAID";
}, {
    member_id: number;
    amount: number;
    transaction_id: string;
    status: string;
}>;
export interface createPaymentRequest {
    member_id: number;
    amount: number;
    transaction_id: string;
    status: 'PAID' | 'UNPAID';
}
