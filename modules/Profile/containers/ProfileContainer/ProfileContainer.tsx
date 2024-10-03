import { useState } from "react";

import { ActionIcon, Button, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import Navbar from "@/modules/Dasboard/components/Navbar/Navbar";
import { useGetUserDetailsQuery } from "@/shared/redux/rtk-apis/users/users.api";

import TeacherProfile from "../../components/TeacherProfile/TeacherProfile";
import { useStyles } from "./ProfileContainer.styles";

const ProfileContainer = () => {
  const { classes } = useStyles();
  const { data: user, isLoading, error } = useGetUserDetailsQuery();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);

  if (isLoading) return <Loader />;

  if (error) {
    notifications.show({
      title: "Error",
      message: "Error loading profile data",
      color: "red",
    });
    return null;
  }

  if (!user) {
    return (
      <Title order={3} color="white">
        No user data available
      </Title>
    );
  }

  return (
    <div>
      <Navbar />
      <SimpleGrid className={classes.container}>
        <Title className={classes.title}>Profile</Title>
        <Flex justify="flex-end" gap="md" align="center">
          <Button size="compact-md" variant="outline" className={classes.button}>
            Reset Password
          </Button>
          {!isEditing ? (
            <ActionIcon variant="outline" className={classes.actionIcon} onClick={handleEditClick}>
              <FaRegEdit className={classes.editIcon} />
            </ActionIcon>
          ) : (
            <ActionIcon
              color="red"
              variant="outline"
              className={classes.actionIcon}
              onClick={handleCloseEdit}
            >
              <IoMdClose className={classes.closeIcon} />
            </ActionIcon>
          )}
        </Flex>
        {user.userType === "teacher" && (
          <>
            {!isEditing ? (
              <TeacherProfile user={user} />
            ) : (
              <>{/* TODO: Teacher's edit form modal */}</>
            )}
          </>
        )}
        {user.userType === "student" && <>{/* TODO: student profile and update profile form */}</>}
      </SimpleGrid>
    </div>
  );
};

export default ProfileContainer;
