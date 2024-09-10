import { useState } from "react";

import { ActionIcon, Menu } from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";

import { Classroom } from "@/modules/Dasboard/components/ClassroomCardList/ClassroomCardList.types";

import DeleteClassroomConfirmation from "../DeleteClassroomConfirmation/DeleteClassroomConfirmation";

const EditOrDeleteClassroom = ({ classroom }: { classroom: Classroom }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
        <Menu.Target>
          <ActionIcon m={"lg"} variant="transparent" color="white">
            <HiDotsHorizontal color="white" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item color="red" onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <DeleteClassroomConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        classroomId={classroom.id}
      />
    </>
  );
};

export default EditOrDeleteClassroom;
