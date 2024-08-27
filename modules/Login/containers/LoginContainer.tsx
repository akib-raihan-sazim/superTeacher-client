import React from "react";

import LoginForm from "../components/LoginForm";
import { ILoginFormValues } from "../components/LoginForm.types";

const LoginContainer = () => {
  const handleSubmit = (data: ILoginFormValues) => {
    // TODO Api integration
    console.log("Form submitted with data:", data);
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginContainer;
