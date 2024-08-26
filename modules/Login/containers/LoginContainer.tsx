import React from "react";

import { notifications } from "@mantine/notifications";

import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { ILoginFormValues } from "@/shared/redux/rtk-apis/auth/auth.types";

import LoginForm from "../components/LoginForm";
import { ApiError } from "./LoginContainer.types";

const LoginContainer = () => {
  const [login] = useLoginMutation();

  const handleSubmit = async (data: ILoginFormValues) => {
    try {
      const result = await login(data).unwrap();

      localStorage.setItem("authToken", result.token);

      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "blue",
      });

      // TODO Redirect based on user type
    } catch (error) {
      console.error("Login failed:", error);

      const errorMessage = (error as ApiError)?.data?.message || "Login unsuccessful!";

      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginContainer;
