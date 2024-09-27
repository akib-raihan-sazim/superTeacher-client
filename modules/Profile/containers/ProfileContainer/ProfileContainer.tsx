import { useState } from "react";

import { ActionIcon, Button, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import Navbar from "@/modules/Dasboard/components/Navbar/Navbar";
import { useGetUserDetailsQuery } from "@/shared/redux/rtk-apis/users/users.api";

import ResetPasswordFormModal from "../../components/ResetPasswordFormModal/ResetPasswordFormModal";
import StudentProfile from "../../components/StudentProfile/StudentProfile";
import StudentUpdateProfileForm from "../../components/StudentUpdateProfileForm/StudentUpdateProfileForm";
import TeacherProfile from "../../components/TeacherProfile/TeacherProfile";
import TeacherUpdateProfileForm from "../../components/TeacherUpdateProfileForm/TeacherUpdateProfileForm";

const ProfileContainer = () => {
  const { data: user, isLoading, error } = useGetUserDetailsQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleOpenResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
  };

  const handleCloseResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Title order={3} c="red">
        Error loading profile data
      </Title>
    );
  if (!user) return <Title order={3}>No user data available</Title>;

  return (
    <div>
      <Navbar />
      <SimpleGrid style={{ marginInline: "5%" }}>
        <Title mt="md" c="#4CAF50">
          Profile
        </Title>
        <Flex justify="flex-end" gap="md" align="center">
          <Button
            size="compact-md"
            variant="outline"
            style={{ border: "1px solid #4CAF50", color: "#4CAF50" }}
            onClick={handleOpenResetPasswordModal}
          >
            Reset Password
          </Button>
          {!isEditing ? (
            <ActionIcon
              color="sazim-green"
              variant="outline"
              style={{ border: "1px solid #4CAF50" }}
              onClick={handleEditClick}
            >
              <FaRegEdit color="#4CAF50" />
            </ActionIcon>
          ) : (
            <ActionIcon
              color="red"
              variant="outline"
              style={{ border: "1px solid #4CAF50" }}
              onClick={handleCloseEdit}
            >
              <IoMdClose color="#4CAF50" />
            </ActionIcon>
          )}
        </Flex>
        {user.userType === "teacher" && (
          <>
            {isEditing ? (
              <TeacherUpdateProfileForm user={user} onClose={handleCloseEdit} />
            ) : (
              <TeacherProfile />
            )}
          </>
        )}
        {user.userType === "student" && (
          <>
            {isEditing ? (
              <StudentUpdateProfileForm user={user} onClose={handleCloseEdit} />
            ) : (
              <StudentProfile />
            )}
          </>
        )}
      </SimpleGrid>
      <ResetPasswordFormModal
        opened={isResetPasswordModalOpen}
        onClose={handleCloseResetPasswordModal}
      />
    </div>
  );
};

export default ProfileContainer;
