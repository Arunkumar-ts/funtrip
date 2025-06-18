import { z } from "zod";
export declare const memberSchema: z.ZodObject<{
    member_name: z.ZodString;
    email: z.ZodString;
    phone_no: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    member_name: string;
    email: string;
    phone_no?: string | undefined;
}, {
    member_name: string;
    email: string;
    phone_no?: string | undefined;
}>;
