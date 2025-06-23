import { z } from "zod";

export const getmemberSchema = z.object({
    pageSize:z.number().min(1, "pageSize must be at least 1"),
    pageIndex:z.number().optional().default(0),
    searchString:z.string().optional().default(""),
    sortBy: z.string()
    .refine((val) => ['member_id', 'member_name', 'email', 'phone_no'].includes(val), {
      message: "Invalid sortBy field",
    }).optional().default('member_id'),
    sortOn: z.string()
    .refine(val => val === "asc" || val === "desc", {
      message: "sortOn must be either 'asc' or 'desc'",
    }).optional().default('asc'),

}).strict();

export interface GetMemberRequest {
  pageSize: number;
  pageIndex: number;
  searchString?: string;
  sortBy?: string;
  sortOn?: 'asc' | 'desc';
}