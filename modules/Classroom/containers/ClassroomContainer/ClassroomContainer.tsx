import { useRouter } from "next/router";

import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import Navbar from "@/modules/Dasboard/components/Navbar/Navbar";
import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useGetClassroomByIdQuery } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import ClassroomNav from "../../components/ClassroomNav/ClassroomNav";

const ClassroomContainer = () => {
  const user = useAppSelector(selectAuthenticatedUser);
  const router = useRouter();
  const { classroomID } = router.query;
  const {
    data: classroom,
    isLoading,
    error,
  } = useGetClassroomByIdQuery(Number(classroomID), {
    skip: !user.userId,
  });

  if (error) {
    notifications.show({
      title: "Error",
      message: "Failed to load classroom data. Please try again later.",
      color: "red",
      autoClose: 5000,
    });
  }

  return (
    <>
      <Navbar />
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayBlur={2} />
      {!isLoading && classroom && <ClassroomNav classroom={classroom} />}
    </>
  );
};

export default ClassroomContainer;
