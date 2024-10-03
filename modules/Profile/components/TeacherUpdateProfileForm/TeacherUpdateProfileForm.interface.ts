import { IUser } from "@/shared/redux/rtk-apis/users/users.types";

export interface ITeacherUpdateProfileFormProps {
  user: IUser;
  onClose: () => void;
}
