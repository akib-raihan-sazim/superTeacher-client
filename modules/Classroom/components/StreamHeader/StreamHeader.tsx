import { BackgroundImage, Box, Flex, Title } from "@mantine/core";

import ClassroomInfoMenu from "../ClassroomInfoMenu/ClassroomInfoMenu";
import EditClassroom from "../EditClassroom/EditClassroom";
import { useStyles } from "./StreamHeader.styles";

const StreamHeader = () => {
  const { classes } = useStyles();

  return (
    <Box mx="auto" maw="97%" mih={300} mt="lg">
      <BackgroundImage src="/bg-8.png" radius="md">
        <Flex justify="space-between" mih={300}>
          <Flex justify="flex-end" direction="column" ml={{ base: "md", sm: "xl" }} mb="sm">
            <Title fw={700} tt="uppercase" className={`${classes.title} ${classes.desktopTitle}`}>
              Classroom 1
            </Title>
            <Title
              fw={700}
              tt="uppercase"
              order={2}
              className={`${classes.title} ${classes.mobileTitle}`}
            >
              Classroom 1
            </Title>
          </Flex>

          <Flex direction="column" justify="space-between">
            <EditClassroom />
            <ClassroomInfoMenu />
          </Flex>
        </Flex>
      </BackgroundImage>
    </Box>
  );
};

export default StreamHeader;
