import React, { useState } from "react";

import { useRouter } from "next/router";

import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";

import { setToken, setUser } from "@/shared/redux/reducers/auth.reducer";
import { useRegisterTeacherMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { TTeacherRegistrationFields } from "@/shared/redux/rtk-apis/auth/auth.types";

import TeacherRegistrationForm from "../../components/teacher/TeacherRegistrationForm";
import { APIError, UniqueCodeError } from "../../components/teacher/TeacherRegistrationForm.type";

const TeacherRegistrationContainer: React.FC = () => {
  const [registerTeacher] = useRegisterTeacherMutation();
  const [uniqueCodeError, setUniqueCodeError] = useState<UniqueCodeError | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data: TTeacherRegistrationFields) => {
    const registrationData: TTeacherRegistrationFields = {
      ...data,
      userType: "teacher",
    };
    try {
      const result = await registerTeacher(registrationData).unwrap();
      dispatch(setUser(result.user));
      dispatch(setToken(result.token));
      localStorage.setItem("authToken", result.token);
      notifications.show({
        title: "Success",
        message: "Teacher registration successful!",
        color: "blue",
      });
      setUniqueCodeError(null);
      router.push("/dashboard/teacher");
    } catch (error) {
      console.error("Registration failed:", error);
      const apiError = error as APIError;
      if (apiError.data && apiError.data.message) {
        if (apiError.data.message.includes("unique code")) {
          setUniqueCodeError({
            message: apiError.data.message,
            remainingUses: apiError.data.remainingUses ?? 0,
            usageCount: apiError.data.usageCount ?? 0,
          });
        } else {
          setUniqueCodeError(null);
        }
      } else {
        setUniqueCodeError(null);
      }
      notifications.show({
        title: "Error",
        message: apiError.data.message,
        color: "red",
      });
    }
  };

  return (
    <div>
      <TeacherRegistrationForm onSubmit={handleSubmit} uniqueCodeError={uniqueCodeError} />
    </div>
  );
};

export default TeacherRegistrationContainer;
