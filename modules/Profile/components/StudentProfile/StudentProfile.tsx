import { Grid, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { EEducationLevel } from "@/shared/typedefs";

import { IStudentProfileProps } from "./StudentProfile.interface";

const StudentProfile: React.FC<IStudentProfileProps> = ({ user }) => {
  if (!user || !user.student) {
    notifications.show({
      title: "Profile Data Unavailable",
      message: "No teacher profile data is available at the moment.",
      color: "red",
    });
  }
  if (!user || !user.student) return null;

  const profileItems = [
    { label: "Email", value: user.email },
    { label: "Gender", value: user.gender || "Not specified" },
    { label: "First name", value: user.firstName },
    { label: "Last name", value: user.lastName },
    { label: "Education Level", value: user.student.educationLevel },
    { label: "Phone Number", value: user.student.phoneNo },
    { label: "Address", value: user.student.address },
  ];

  if (
    user.student.educationLevel === EEducationLevel.SCHOOL ||
    user.student.educationLevel === EEducationLevel.COLLEGE
  ) {
    profileItems.push(
      { label: "Medium", value: user.student.medium || "Not specified" },
      { label: "Class", value: user.student.class || "Not specified" },
    );
  } else if (user.student.educationLevel === EEducationLevel.UNIVERSITY) {
    profileItems.push(
      { label: "Degree Type", value: user.student.degree || "Not specified" },
      { label: "Degree Name", value: user.student.degreeName || "Not specified" },
      { label: "Semester/Year", value: user.student.semester || "Not specified" },
    );
  }

  return (
    <Grid gutter="xl">
      {profileItems.map((item, index) => (
        <Grid.Col key={index} xs={12} sm={6}>
          <Title order={4} c="white">
            {item.label}
          </Title>
          <Title
            order={3}
            c="#4CAF50"
            tt={item.label.toLowerCase() === "email" ? "lowercase" : "capitalize"}
          >
            {item.value}
          </Title>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default StudentProfile;
