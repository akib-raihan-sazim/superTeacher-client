export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  onSubmit: (data: ILoginFormValues) => void;
}
