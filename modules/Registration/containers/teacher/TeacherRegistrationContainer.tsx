import React from "react";

import TeacherRegistrationForm from "../../components/teacher/TeacherRegistrationForm";
import { ITeacherFormValues } from "../../components/teacher/TeacherRegistrationForm.helpers";

const TeacherRegistrationContainer: React.FC = () => {
  const handleSubmit = (data: ITeacherFormValues) => {
    // TODO Api integration
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <TeacherRegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default TeacherRegistrationContainer;
