import { Grid } from "@mantine/core";

import ClassroomCard from "../ClassroomCard/ClassroomCard";
import { Classroom, ClassroomListProps } from "./ClassroomCardList.types";

const ClassroomList: React.FC<ClassroomListProps> = ({ classrooms }) => (
  <Grid>
    {classrooms.map((classroom: Classroom) => (
      <Grid.Col key={classroom.id} xs={12} sm={6} md={4} lg={3}>
        <ClassroomCard classroom={classroom} />
      </Grid.Col>
    ))}
  </Grid>
);

export default ClassroomList;
