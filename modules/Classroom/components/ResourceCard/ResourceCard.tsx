import { useState } from "react";

import { Card, Flex, Text, Button, Group, Menu, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { AiOutlineBook } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import { ApiError } from "@/modules/Login/containers/LoginContainer.types";
import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useDeleteResourceMutation } from "@/shared/redux/rtk-apis/classworks/classworks.api";

import MaterialFormModal from "../MaterialFormModal/MaterialFormModal";
import { IResourceCardProps } from "./ResourceCard.interface";
import { useStyles } from "./ResourceCard.styles";

const ResourceCard: React.FC<IResourceCardProps> = ({ resource, classroomId }) => {
  const { classes } = useStyles();
  const user = useAppSelector(selectAuthenticatedUser);
  const [deleteResource] = useDeleteResourceMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteResource({ classroomId: classroomId, resourceId: resource.id }).unwrap();
      showNotification({
        title: "Success",
        message: "Resource deleted successfully.",
        color: "blue",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: (error as ApiError).data?.message,
        color: "red",
      });
    }
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <Card my={"md"} px={{ base: "xs", sm: "md", md: "lg" }} className={classes.card}>
        {user?.userType === "teacher" && (
          <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent" color="white" className={classes.actionIcon}>
                <HiDotsHorizontal />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={openEditModal}>Edit</Menu.Item>
              <Menu.Item color="red" onClick={handleDelete}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}

        <Flex justify="space-between" wrap="wrap" align="center">
          <Flex align="center">
            <span className={classes.iconContainer}>
              <AiOutlineBook />
            </span>
            <Text fw={700}>{resource.title}</Text>
          </Flex>
        </Flex>

        <Text my={"md"}>{resource.description}</Text>

        <Group position="right">
          <Button rightIcon={<FaDownload />} className={classes.downloadButton} size="compact-sm">
            Download
          </Button>
        </Group>
      </Card>

      {editModalOpen && (
        <MaterialFormModal
          opened={editModalOpen}
          onClose={closeEditModal}
          classroomId={classroomId}
          resource={resource}
        />
      )}
    </>
  );
};

export default ResourceCard;
