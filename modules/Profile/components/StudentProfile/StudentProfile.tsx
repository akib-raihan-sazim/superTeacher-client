import { Grid, Title } from "@mantine/core";

import { getStudentProfileItems } from "./StudentProfile.helpers";
import { IStudentProfileProps } from "./StudentProfile.interface";

const StudentProfile: React.FC<IStudentProfileProps> = ({ user }) => {
  if (!user || !user.student) return null;

  const profileItems = getStudentProfileItems(user);

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
