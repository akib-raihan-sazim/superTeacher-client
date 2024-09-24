import { z } from "zod";

export const examFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  instruction: z.string().min(1, { message: "Instruction is required" }),
  date: z.date({ required_error: "Date is required" }).refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
});

export type TExamFormValues = z.infer<typeof examFormSchema>;
