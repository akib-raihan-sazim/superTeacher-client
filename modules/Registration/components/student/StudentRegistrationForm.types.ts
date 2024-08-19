export type TStudentRegistrationFormData = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  educationLevel?: "School" | "College" | "University";
  password: string;
  confirmPassword: string;
  englishBanglaMedium?: string;
  class?: string;
  degreeType?: "Bachelors" | "Masters";
  degreeName?: string;
  semesterYear?: string;
};
