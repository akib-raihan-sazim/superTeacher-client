import { ITeacherFormValues } from "./TeacherRegistrationForm.helpers";

export interface ITeacherRegistrationFormProps {
  onSubmit: (data: ITeacherFormValues) => void;
}
