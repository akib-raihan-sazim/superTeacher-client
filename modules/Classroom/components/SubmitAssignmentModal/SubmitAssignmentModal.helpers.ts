import { z } from "zod";

export const assignmentSubmissionSchema = z.object({
  file: z.instanceof(File, { message: "File is required" }),
});

export type TAssignmentSubmissionValues = z.infer<typeof assignmentSubmissionSchema>;
