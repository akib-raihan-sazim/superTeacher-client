import { Box, Divider, Text, Title } from "@mantine/core";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

import { ITeacherHeaderProps } from "./TeacherHeader.interface";

const TeacherHeader: React.FC<ITeacherHeaderProps> = ({ classroom }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  return (
    <Box mt={"md"}>
      <Title order={2} c={"white"}>
        Teacher
      </Title>
      <Divider my="sm" />
      <Text c={"white"}>
        {classroom.teacher.user.firstName} {classroom.teacher.user.lastName}{" "}
        {user.userType === EUserRole.TEACHER && classroom.teacher.user.email === user.email
          ? "(you)"
          : null}
      </Text>
    </Box>
  );
};

export default TeacherHeader;
