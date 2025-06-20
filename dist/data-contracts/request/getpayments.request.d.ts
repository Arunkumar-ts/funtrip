import { z } from "zod";
export declare const getPaymentsSchema: z.ZodObject<{
    pageSize: z.ZodNumber;
    pageIndex: z.ZodDefault<z.ZodNumber>;
    searchString: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>>>;
    sortOn: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, "ASC" | "DESC", string>>>;
}, "strict", z.ZodTypeAny, {
    pageSize: number;
    pageIndex: number;
    searchString: string;
    sortBy: string;
    sortOn: "ASC" | "DESC";
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
    sortOn?: 'ASC' | 'DESC';
}
