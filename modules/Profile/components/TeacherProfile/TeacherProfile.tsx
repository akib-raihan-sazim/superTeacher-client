import { Grid, Table, Title, Box } from "@mantine/core";

import { useGetUserDetailsQuery } from "@/shared/redux/rtk-apis/users/users.api";

const TeacherProfile: React.FC = () => {
  const { data: user, isLoading, error } = useGetUserDetailsQuery();

  if (isLoading) return <Title order={3}>Loading...</Title>;
  if (error)
    return (
      <Title order={3} c="red">
        Error loading profile data
      </Title>
    );
  if (!user || !user.teacher) return <Title order={3}>No teacher profile data available</Title>;

  const subjectToTeachRows = user.teacher.subjectsToTeach.map((subject, index) => (
    <tr key={subject}>
      <td>
        <Title order={4} ta="center" c="#4CAF50">
          {index + 1}
        </Title>
      </td>
      <td>
        <Title order={4} ta="center" c="#4CAF50">
          {subject}
        </Title>
      </td>
    </tr>
  ));

  const profileItems = [
    { label: "Email", value: user.email },
    { label: "Gender", value: user.gender || "Not specified" },
    { label: "First name", value: user.firstName },
    { label: "Last name", value: user.lastName },
    { label: "Major Subject", value: user.teacher.majorSubject },
    { label: "Highest education level", value: user.teacher.highestEducationLevel },
  ];

  return (
    <Grid gutter="xl">
      {profileItems.map((item, index) => (
        <Grid.Col key={index} xs={12} sm={6}>
          <Title order={4} c="white">
            {item.label}
          </Title>
          <Title order={3} c="#4CAF50">
            {item.value}
          </Title>
        </Grid.Col>
      ))}
      <Grid.Col xs={12} sm={6}>
        <Title order={4} c="white">
          Subjects to teach
        </Title>
        <Box style={{ overflow: "auto" }}>
          <Table withColumnBorders my="md" style={{ maxWidth: "80%" }}>
            <thead>
              <tr>
                <th>
                  <Title order={4} ta="center" c="white">
                    SL.
                  </Title>
                </th>
                <th>
                  <Title order={4} ta="center" c="white">
                    Subject
                  </Title>
                </th>
              </tr>
            </thead>
            <tbody>{subjectToTeachRows}</tbody>
          </Table>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default TeacherProfile;
