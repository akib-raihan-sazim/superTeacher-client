import { SimpleGrid, Flex, Text, Group, ActionIcon } from "@mantine/core";
import { FaRegTrashAlt } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

import { StudentListProps } from "./StudentList.interface";

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  return (
    <SimpleGrid>
      {students.map((student) => (
        <Flex key={student.id} justify="space-between">
          <Text c={"white"}>
            {student.firstName} {student.lastName}
          </Text>
          <Group>
            <Text c={"white"}>{student.email}</Text>
            {user?.userType === EUserRole.TEACHER && (
              <ActionIcon variant="subtle">
                <FaRegTrashAlt color="white" />
              </ActionIcon>
            )}
          </Group>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default StudentList;
