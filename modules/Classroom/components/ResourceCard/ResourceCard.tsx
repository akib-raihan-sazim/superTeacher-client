import React, { useState } from "react";

import { Card, Flex, Text, Button, Group, Menu, ActionIcon } from "@mantine/core";
import { AiOutlineBook } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useGetResourceDownloadUrlQuery } from "@/shared/redux/rtk-apis/classworks/classworks.api";

import ConfirmDeleteResourceModal from "../ConfirmDeleteResourceModal/ConfirmDeleteResourceModal";
import MaterialFormModal from "../MaterialFormModal/MaterialFormModal";
import { IResourceCardProps } from "./ResourceCard.interface";
import { useStyles } from "./ResourceCard.styles";

const ResourceCard: React.FC<IResourceCardProps> = ({ resource, classroomId }) => {
  const { classes } = useStyles();
  const user = useAppSelector(selectAuthenticatedUser);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const {
    data: downloadUrl,
    isFetching,
    isError,
  } = useGetResourceDownloadUrlQuery(
    { classroomId, resourceId: resource.id },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    } else {
      console.error("Download URL is undefined");
    }
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
              <Menu.Item onClick={() => setEditModalOpen(true)}>Edit</Menu.Item>
              <Menu.Item color="red" onClick={() => setDeleteModalOpen(true)}>
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
          <Button
            rightIcon={<FaDownload />}
            className={classes.downloadButton}
            size="compact-sm"
            loading={isFetching}
            onClick={handleDownload}
            disabled={isError || (!downloadUrl && !isFetching)}
          >
            Download
          </Button>
        </Group>
      </Card>

      {editModalOpen && (
        <MaterialFormModal
          opened={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          classroomId={classroomId}
          resource={resource}
        />
      )}

      {deleteModalOpen && (
        <ConfirmDeleteResourceModal
          resourceId={resource.id}
          classroomId={classroomId}
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default ResourceCard;
