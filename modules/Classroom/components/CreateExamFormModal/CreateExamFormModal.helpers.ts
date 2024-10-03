import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const examFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  instruction: z.string().min(1, { message: "Instruction is required" }),
  date: z.date({ required_error: "Date is required" }).refine((date) => date >= today, {
    message: "Date cannot be in the past",
  }),
});

export type TExamFormValues = z.infer<typeof examFormSchema>;
