import { z } from "zod";

// member input
export const memberSchema = z.object({
  member_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone_no: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits")
  .optional()
});