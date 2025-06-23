import { z } from "zod";

export const getPaymentsSchema = z.object({
    pageSize:z.number().min(1, "pageSize must be at least 1"),
    pageIndex:z.number().optional().default(0),
    searchString:z.string().optional().default(""),
    sortBy: z.string()
    .refine((val) => ['member_name', 'amount', 'member_id', 'transaction_id', 'status', 'created_on'].includes(val), {
      message: "Invalid sortBy field",
    }).optional().default('created_on'),
    sortOn: z.string()
    .refine(val => val === "asc" || val === "desc", {
      message: "sortOn must be either 'asc' or 'desc'",
    }).optional().default('asc'),

}).strict();

export interface getPaymentsRequest {
  pageSize: number;
  pageIndex: number;
  searchString?: string;
  sortBy?: string;
  sortOn?: 'asc' | 'desc';
}