import { Box, Divider, Text } from "@mantine/core";

import StudentHeader from "../StudentHeader/StudentHeader";
import StudentList from "../StudentList/StudentList";
import TeacherHeader from "../TeacherHeader/TeacherHeader";
import { IPeopleLayoutProps } from "./PeopleLayout.interface";

const PeopleLayout: React.FC<IPeopleLayoutProps> = ({ students, classroom }) => (
  <Box mx="xs" py="sm" px="xl" mih="100vh" w="100%">
    <TeacherHeader classroom={classroom} />
    <StudentHeader classroomId={classroom.id} />
    <Divider my="sm" />
    {students.length > 0 ? (
      <StudentList students={students} />
    ) : (
      <Text>No students found for this classroom.</Text>
    )}
  </Box>
);

export default PeopleLayout;
