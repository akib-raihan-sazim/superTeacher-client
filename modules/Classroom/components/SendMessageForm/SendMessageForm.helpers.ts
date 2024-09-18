import { z } from "zod";

export const SendMessageFormSchema = z
  .object({
    content: z.string().min(1, "You need to input a message in the text box"),
  })
  .strict();

export type SendMessageFormValues = z.infer<typeof SendMessageFormSchema>;
