import React from "react";

import { notifications } from "@mantine/notifications";

import { useRegisterStudentMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { TStudentRegistrationFields } from "@/shared/redux/rtk-apis/auth/auth.types";

import { StudentRegistrationForm } from "../../components/student/StudentRegistrationForm";
import { TStudentRegistrationFormData } from "../../components/student/StudentRegistrationForm.types";

export function StudentRegistrationContainer() {
  const [registerStudent] = useRegisterStudentMutation();

  const handleSubmit = async (data: TStudentRegistrationFormData) => {
    const registrationData: TStudentRegistrationFields = {
      ...data,
      userType: "student",
    };
    try {
      const result = await registerStudent(registrationData).unwrap();
      console.log("Registration successful:", result);
      notifications.show({
        title: "Success",
        message: "Registration successful!",
        color: "blue",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      notifications.show({
        title: "Error",
        message: "Registration failed. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <div>
      <StudentRegistrationForm onSubmit={handleSubmit} />
    </div>
  );
}
