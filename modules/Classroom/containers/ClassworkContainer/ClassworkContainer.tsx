import { Box, Divider, Title } from "@mantine/core";

import CreateFileButton from "../../components/CreateFileButton/CreateFileButton";
import ExamList from "../../components/ExamList/ExamList";
import Resources from "../../components/Resources/Resources";
import { IClassworkContainerProps } from "./ClassworkContainer.interface";

const ClassworkContainer: React.FC<IClassworkContainerProps> = ({ classroom }) => (
  <Box py="sm" px={{ base: 0, sm: "xl" }}>
    <CreateFileButton classroom={classroom} />
    <Title order={2} c={"white"}>
      Uploaded Resources
    </Title>
    <Divider my="sm" />
    <Resources classroomId={classroom.id} />
    <ExamList classroomId={classroom.id} />
  </Box>
);

export default ClassworkContainer;
