import { IUser } from "@/shared/redux/rtk-apis/users/users.types";

export const getTeacherProfileItems = (user: IUser) => [
  { label: "Email", value: user.email },
  { label: "Gender", value: user.gender || "Not specified" },
  { label: "First name", value: user.firstName },
  { label: "Last name", value: user.lastName },
  { label: "Major Subject", value: user.teacher?.majorSubject || "Not specified" },
  {
    label: "Highest education level",
    value: user.teacher?.highestEducationLevel || "Not specified",
  },
];
