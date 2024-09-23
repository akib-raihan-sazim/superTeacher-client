import { z } from "zod";

export const assignmentFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  file: z.instanceof(File, { message: "File is required" }),
  dueDate: z.date({ required_error: "Due date is required" }),
});

export const assignmentFormSchemaEdit = assignmentFormSchema.extend({
  file: z.instanceof(File, { message: "File is optional" }).optional(),
});

export type TAssignmentFormValues = z.infer<typeof assignmentFormSchema>;
export type TAssignmentFormValuesEdit = z.infer<typeof assignmentFormSchemaEdit>;
