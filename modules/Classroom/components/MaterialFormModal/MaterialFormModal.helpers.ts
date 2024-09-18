import { z } from "zod";

export const materialFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  file: z
    .instanceof(File, { message: "File is required" })
    .nullable()
    .refine((file) => file !== null, { message: "File is required" }),
});

export type TMaterialFormValues = z.infer<typeof materialFormSchema>;
