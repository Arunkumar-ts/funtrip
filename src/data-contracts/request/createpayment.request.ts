import { z } from "zod";

// member input
export const paymentSchema = z.object({
    member_id: z.number(),
    amount:z.number().min(1, "Amount is require"),
    transaction_id :z.string().min(1, "Transaction ID is required"),
    status :z.string().transform(val => val.toUpperCase())
    .refine(val => val === "PAID" || val === "UNPAID", {
      message: "Status must be either 'PAID' or 'UNPAID'",
    }),
}).strict();

export interface createPaymentRequest {
    member_id:number;
    amount:number;
    transaction_id:string;
    status: 'PAID' | 'UNPAID';
}