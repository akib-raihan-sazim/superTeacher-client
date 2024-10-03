import { IUser } from "@/shared/redux/rtk-apis/users/users.types";

export interface IStudentUpdateProfileFormProps {
  user: IUser;
  onClose: () => void;
}
