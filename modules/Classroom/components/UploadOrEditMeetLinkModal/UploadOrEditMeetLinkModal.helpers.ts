import { z } from "zod";

export const meetlinkSchema = z.object({
  meetlink: z.string().url("Please enter a valid URL").nonempty("Meet link is required"),
});

export type TMeetlinkFormValues = z.infer<typeof meetlinkSchema>;
