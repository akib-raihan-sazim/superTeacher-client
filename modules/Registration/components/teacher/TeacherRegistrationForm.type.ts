import { ITeacherFormValues } from "./TeacherRegistrationForm.helpers";

export interface UniqueCodeError {
  message: string;
  remainingUses: number;
  usageCount: number;
}

export interface ITeacherRegistrationFormProps {
  onSubmit: (data: ITeacherFormValues) => void;
}

export interface IExtendedTeacherRegistrationFormProps extends ITeacherRegistrationFormProps {
  uniqueCodeError: UniqueCodeError | null;
}

export interface APIError {
  data: {
    message: string;
    remainingUses?: number;
    usageCount?: number;
  };
}
