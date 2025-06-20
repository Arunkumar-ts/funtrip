import { z } from "zod";

export const getPaymentsSchema = z.object({
    pageSize:z.number().min(1, "pageSize must be at least 1"),
    pageIndex:z.number().default(0),
    searchString:z.string().optional().default(""),
    sortBy: z.string()
    .transform((val) => val.toLowerCase())
    .refine((val) => ["member_name", "amount", "member_id", "transaction_id", "status", "created_on"].includes(val), {
      message: "Invalid sortBy field",
    }).optional().default("created_on"),
    sortOn: z.string()
    .transform(val => val.toUpperCase())
    .refine(val => val === "ASC" || val === "DESC", {
      message: "sortOn must be either 'ASC' or 'DESC'",
    }).optional().default("ASC"),

}).strict();

export interface getPaymentsRequest {
  pageSize: number;
  pageIndex: number;
  searchString?: string;
  sortBy?: string;
  sortOn?: 'ASC' | 'DESC';
}