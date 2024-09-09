import { useState } from "react";

import { ActionIcon, Flex, Title } from "@mantine/core";
import { FaRegPlusSquare } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

import StudentSearchModal from "../StudentSearchModal/StudentSearchModal";
import { StudentHeaderProps } from "./StudentHeader.interface";

const StudentHeader: React.FC<StudentHeaderProps> = ({ classroomId }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Flex align={"center"} justify={"space-between"} mt={"xl"}>
        <Title order={2} c={"white"}>
          Students
        </Title>
        {user?.userType === EUserRole.TEACHER && (
          <ActionIcon onClick={handleOpenModal}>
            <FaRegPlusSquare color="#4CAF50" />
          </ActionIcon>
        )}
      </Flex>
      <StudentSearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        classroomId={classroomId}
      />
    </>
  );
};

export default StudentHeader;
