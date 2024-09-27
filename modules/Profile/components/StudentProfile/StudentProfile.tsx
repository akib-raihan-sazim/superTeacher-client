import { Grid, Title } from "@mantine/core";

import { useGetUserDetailsQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { EEducationLevel } from "@/shared/typedefs";

const StudentProfile: React.FC = () => {
  const { data: user, isLoading, error } = useGetUserDetailsQuery();

  console.log(user);

  if (isLoading) return <Title order={3}>Loading...</Title>;
  if (error)
    return (
      <Title order={3} c="red">
        Error loading profile data
      </Title>
    );
  if (!user || !user.student) return <Title order={3}>No student profile data available</Title>;

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
