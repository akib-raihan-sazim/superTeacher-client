import { Grid, Table, Title, Box } from "@mantine/core";

import { getTeacherProfileItems } from "./TeacherProfile.helpers";
import { ITeacherProfileProps } from "./TeacherProfile.interface";

const TeacherProfile: React.FC<ITeacherProfileProps> = ({ user }) => {
  if (!user || !user.teacher) {
    return null;
  }

  const profileItems = getTeacherProfileItems(user);

  const subjectToTeachRows = user.teacher.subjectsToTeach?.map((subject, index) => (
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
