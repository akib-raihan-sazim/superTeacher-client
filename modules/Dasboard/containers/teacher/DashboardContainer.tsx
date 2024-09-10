import { Box, Container, LoadingOverlay, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import { useGetClassroomsQuery } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import ClassroomList from "../../components/ClassroomCardList/ClassroomCardList";
import CreateClassroomButton from "../../components/CreateClassroomButton/CreateClassroomButton";
import Navbar from "../../components/Navbar/Navbar";

const DashboardContainer: React.FC = () => {
  const user = useAppSelector(selectAuthenticatedUser);
  const {
    data: classrooms,
    isLoading,
    error,
  } = useGetClassroomsQuery(undefined, {
    skip: !user.userId,
  });

  if (error) {
    notifications.show({
      title: "Error",
      message: "Failed to load classrooms. Please try again later.",
      color: "red",
      autoClose: 5000,
    });
  }
  return (
    <>
      <Navbar />
      <Container size="xl" mt="xl" style={{ position: "relative", minHeight: "200px" }}>
        <LoadingOverlay visible={isLoading} zIndex={1000} overlayBlur={2} />
        {!isLoading &&
          (classrooms?.length ? (
            <ClassroomList classrooms={classrooms} />
          ) : user?.userType === EUserRole.STUDENT ? (
            <Box
              style={{
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text size="lg" color="dimmed">
                You are not yet enrolled in any classroom.
              </Text>
            </Box>
          ) : (
            <CreateClassroomButton />
          ))}
      </Container>
    </>
  );
};

export default DashboardContainer;
