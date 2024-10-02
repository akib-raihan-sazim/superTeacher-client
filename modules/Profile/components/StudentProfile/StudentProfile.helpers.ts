import { IUser } from "@/shared/redux/rtk-apis/users/users.types";
import { EEducationLevel } from "@/shared/typedefs";

export const getStudentProfileItems = (user: IUser) => {
  const profileItems = [
    { label: "Email", value: user.email },
    { label: "Gender", value: user.gender || "Not specified" },
    { label: "First name", value: user.firstName },
    { label: "Last name", value: user.lastName },
    { label: "Education Level", value: user.student?.educationLevel || "Not specified" },
    { label: "Phone Number", value: user.student?.phoneNo || "Not specified" },
    { label: "Address", value: user.student?.address || "Not specified" },
  ];
  if (
    user.student?.educationLevel === EEducationLevel.SCHOOL ||
    user.student?.educationLevel === EEducationLevel.COLLEGE
  ) {
    profileItems.push(
      { label: "Medium", value: user.student?.medium || "Not specified" },
      { label: "Class", value: user.student?.class || "Not specified" },
    );
  } else if (user.student?.educationLevel === EEducationLevel.UNIVERSITY) {
    profileItems.push(
      { label: "Degree Type", value: user.student?.degree || "Not specified" },
      { label: "Degree Name", value: user.student?.degreeName || "Not specified" },
      { label: "Semester/Year", value: user.student?.semester || "Not specified" },
    );
  }

  return profileItems;
};
