import { Box, Divider, Title } from "@mantine/core";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";

import AssignmentList from "../../components/AssignmentList/AssignmentList";
import CreateFileButton from "../../components/CreateFileButton/CreateFileButton";
import ExamList from "../../components/ExamList/ExamList";
import Resources from "../../components/Resources/Resources";
import { IClassworkContainerProps } from "./ClassworkContainer.interface";

const ClassworkContainer: React.FC<IClassworkContainerProps> = ({ classroom }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  return (
    <Box py="sm" px={{ base: 0, sm: "xl" }}>
      {user.userType === "teacher" && <CreateFileButton classroom={classroom} />}
      <Title order={2} c={"white"} py={"md"}>
        Uploaded Resources
      </Title>
      <Divider my="sm" />
      <Resources classroomId={classroom.id} />
      <ExamList classroomId={classroom.id} />
      <AssignmentList classroomId={classroom.id} />
    </Box>
  );
};

export default ClassworkContainer;
