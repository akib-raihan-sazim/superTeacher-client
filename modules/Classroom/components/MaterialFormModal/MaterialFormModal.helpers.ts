import { z } from "zod";

export const materialFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file !== null, { message: "File is required" }),
});

export const editMaterialFormSchema = materialFormSchema.extend({
  file: z.instanceof(File, { message: "File is optional" }).optional(),
});

export type TMaterialFormValues = z.infer<typeof materialFormSchema>;
export type TMaterialFormValuesEdit = z.infer<typeof editMaterialFormSchema>;
