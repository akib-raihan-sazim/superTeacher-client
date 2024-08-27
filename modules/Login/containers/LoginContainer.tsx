import React from "react";

import { useRouter } from "next/router";

import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";

import { setToken, setUser } from "@/shared/redux/reducers/auth.reducer";
import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { ILoginFormValues } from "@/shared/redux/rtk-apis/auth/auth.types";

import LoginForm from "../components/LoginForm";
import { ApiError } from "./LoginContainer.types";

const LoginContainer = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data: ILoginFormValues) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setUser(result.user));
      dispatch(setToken(result.token));
      localStorage.setItem("authToken", result.token);

      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "blue",
      });
      router.push(`/dashboard/${result.user.userType}`);
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
