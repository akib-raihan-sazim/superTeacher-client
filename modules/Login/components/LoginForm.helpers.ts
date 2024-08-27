import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ILoginFormValues } from "./LoginForm.types";

const LoginFormSchema: z.Schema<ILoginFormValues> = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
      .max(255, { message: "Email can be at most 255 characters" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(255, { message: "Password can be at most 255 characters" }),
  })
  .strict();

export default LoginFormSchema;

export const LoginFormSchemaResolver = zodResolver(LoginFormSchema);

export const loginFormDefaultValues: ILoginFormValues = {
  email: "",
  password: "",
};
