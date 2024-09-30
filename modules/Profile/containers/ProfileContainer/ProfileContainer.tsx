import { useState, useEffect } from "react";

import { ActionIcon, Button, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import Navbar from "@/modules/Dasboard/components/Navbar/Navbar";
import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useGetUserDetailsQuery } from "@/shared/redux/rtk-apis/users/users.api";

import StudentProfile from "../../components/StudentProfile/StudentProfile";
import StudentUpdateProfileForm from "../../components/StudentUpdateProfileForm/StudentUpdateProfileForm";
import TeacherProfile from "../../components/TeacherProfile/TeacherProfile";
import TeacherUpdateProfileForm from "../../components/TeacherUpdateProfileForm/TeacherUpdateProfileForm";
import { useStyles } from "./ProfileContainer.styles";

const ProfileContainer = () => {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useAppSelector(selectAuthenticatedUser);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserDetailsQuery(undefined, {
    skip: !currentUser?.userId,
  });

  const handleEditClick = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Error",
        message: "Error loading profile data",
        color: "red",
      });
    }
  }, [error]);

  if (isLoading) return <Loader />;

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
            <TeacherUpdateProfileForm user={user} onClose={handleCloseEdit} />
          ) : (
            <TeacherProfile user={user} />
          ))}
        {user.userType === "student" &&
          (isEditing ? (
            <StudentUpdateProfileForm user={user} onClose={handleCloseEdit} />
          ) : (
            <StudentProfile user={user} />
          ))}
      </SimpleGrid>
    </div>
  );
};

export default ProfileContainer;
