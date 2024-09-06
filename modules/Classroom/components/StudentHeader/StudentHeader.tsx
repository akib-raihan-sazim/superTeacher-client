import { ActionIcon, Flex, Title } from "@mantine/core";
import { FaRegPlusSquare } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const StudentHeader: React.FC = () => {
  const user = useAppSelector(selectAuthenticatedUser);

  return (
    <Flex align={"center"} justify={"space-between"} mt={"xl"}>
      <Title order={2} c={"white"}>
        Students
      </Title>
      {user?.userType === EUserRole.TEACHER && (
        <ActionIcon>
          <FaRegPlusSquare color="#4CAF50" />
        </ActionIcon>
      )}
    </Flex>
  );
};

export default StudentHeader;
