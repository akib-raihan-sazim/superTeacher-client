import { useState, useEffect } from "react";

import { ActionIcon, Button, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import Navbar from "@/modules/Dasboard/components/Navbar/Navbar";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { useGetUserDetailsQuery } from "@/shared/redux/rtk-apis/users/users.api";

import StudentProfile from "../../components/StudentProfile/StudentProfile";
import TeacherProfile from "../../components/TeacherProfile/TeacherProfile";
import { useStyles } from "./ProfileContainer.styles";

const ProfileContainer = () => {
  const { classes } = useStyles();
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hasToken = isClient && !!localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  const { data: user, isLoading, error } = useGetUserDetailsQuery(undefined, { skip: !hasToken });

  const handleEditClick = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);

  useEffect(() => {
    if (isClient && error) {
      notifications.show({
        title: "Error",
        message: "Error loading profile data",
        color: "red",
      });
    }
  }, [isClient, error]);

  if (!isClient || isLoading) return <Loader />;

  if (!hasToken) {
    return (
      <Title order={3} color="white">
        Please log in to view your profile
      </Title>
    );
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
          <ActionIcon
            variant="outline"
            className={classes.actionIcon}
            onClick={isEditing ? handleCloseEdit : handleEditClick}
          >
            {isEditing ? (
              <IoMdClose className={classes.closeIcon} />
            ) : (
              <FaRegEdit className={classes.editIcon} />
            )}
          </ActionIcon>
        </Flex>
        {user.userType === "teacher" &&
          (isEditing ? (
            <>{/* TODO: Teacher's edit form modal */}</>
          ) : (
            <TeacherProfile user={user} />
          ))}
        {user.userType === "student" &&
          (isEditing ? (
            <>{/* TODO: Student's edit form modal */}</>
          ) : (
            <StudentProfile user={user} />
          ))}
      </SimpleGrid>
    </div>
  );
};

export default ProfileContainer;
