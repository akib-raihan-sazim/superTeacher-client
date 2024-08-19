import React from "react";

import { StudentRegistrationForm } from "../../components/student/StudentRegistrationForm";
import { TStudentRegistrationFormData } from "../../components/student/StudentRegistrationForm.types";

export function StudentRegistrationContainer() {
  const handleSubmit = (data: TStudentRegistrationFormData) => {
    console.log(data);
  };

  return (
    <div>
      <StudentRegistrationForm onSubmit={handleSubmit} />
    </div>
  );
}
