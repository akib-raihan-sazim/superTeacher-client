import { BackgroundImage, Box, Flex, Title } from "@mantine/core";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

import ClassroomInfoMenu from "../ClassroomInfoMenu/ClassroomInfoMenu";
import EditOrDeleteClassroom from "../EditOrDeleteClassroom/EditOrDeleteClassroom";
import { IStreamHeaderProps } from "./StreamHeader.interface";
import { useStyles } from "./StreamHeader.styles";

const StreamHeader: React.FC<IStreamHeaderProps> = ({ classroom }) => {
  const { classes } = useStyles();
  const user = useAppSelector(selectAuthenticatedUser);

  return (
    <Box mx="auto" maw="97%" mih={300} mt="lg">
      <BackgroundImage src="/bg-8.png" radius="md">
        <Flex justify="space-between" mih={300}>
          <Flex justify="flex-end" direction="column" ml={{ base: "md", sm: "xl" }} mb="sm">
            <Title fw={700} tt="uppercase" className={`${classes.title} ${classes.desktopTitle}`}>
              {classroom.title}
            </Title>
            <Title
              fw={700}
              tt="uppercase"
              order={2}
              className={`${classes.title} ${classes.mobileTitle}`}
            >
              {classroom.title}
            </Title>
          </Flex>

          <Flex direction="column" justify="space-between">
            {user?.userType === EUserRole.TEACHER && (
              <EditOrDeleteClassroom classroom={classroom} />
            )}
            <></>
            <ClassroomInfoMenu classroom={classroom} />
          </Flex>
        </Flex>
      </BackgroundImage>
    </Box>
  );
};

export default StreamHeader;
