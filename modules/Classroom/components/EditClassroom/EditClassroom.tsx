import { ActionIcon, Menu } from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";

const EditClassroom = () => (
  <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
    <Menu.Target>
      <ActionIcon m={"lg"} variant="transparent" color="white">
        <HiDotsHorizontal color="white" />
      </ActionIcon>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>Delete</Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

export default EditClassroom;
