import { TStudentRegistrationFormData } from "./StudentRegistrationForm.types";

export interface IStudentRegistrationFormProps {
  onSubmit: (data: TStudentRegistrationFormData) => void;
}
