export type TStudentRegistrationFormData = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
  educationLevel?: "school" | "college" | "university";
  password: string;
  confirmPassword: string;
  medium?: string;
  class?: string;
  degree?: "Bachelors" | "Masters";
  degreeName?: string;
  semester?: string;
};
