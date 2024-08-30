import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const ClassroomFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  class_time: z.string().min(1, { message: "Class time is required" }),
  days: z.array(z.string()).min(1, { message: "At least one day is required" }),
});

export type ClassroomFormData = z.infer<typeof ClassroomFormSchema>;

export const ClassroomFormSchemaResolver = zodResolver(ClassroomFormSchema);

export const ClassroomFormDefaultValues: ClassroomFormData = {
  title: "",
  subject: "",
  class_time: "",
  days: [],
};
