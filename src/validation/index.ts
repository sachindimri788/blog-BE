import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  summary: z.string().min(1, { message: "Summary is required" }),
  active: z.boolean().optional(),
  likes: z.number().optional(),
});
