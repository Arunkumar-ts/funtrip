import { z } from "zod";
export declare const getPaymentsSchema: z.ZodObject<{
    pageSize: z.ZodNumber;
    pageIndex: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    searchString: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>>;
    sortOn: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, "asc" | "desc", string>>>;
}, "strict", z.ZodTypeAny, {
    pageSize: number;
    pageIndex: number;
    searchString: string;
    sortBy: string;
    sortOn: "asc" | "desc";
}, {
    pageSize: number;
    pageIndex?: number | undefined;
    searchString?: string | undefined;
    sortBy?: string | undefined;
    sortOn?: string | undefined;
}>;
export interface getPaymentsRequest {
    pageSize: number;
    pageIndex: number;
    searchString?: string;
    sortBy?: string;
    sortOn?: 'asc' | 'desc';
}
