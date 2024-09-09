import { ActionIcon, Box, Menu, SimpleGrid, Text } from "@mantine/core";
import { BsInfoSquare } from "react-icons/bs";

import { useStyles } from "./ClassroomInfoMenu.styles";

const ClassroomInfoMenu = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.hideOnMediumAndUp}>
      <Menu shadow="xl" position="bottom-end" offset={-1} withArrow arrowPosition="center">
        <Menu.Target>
          <ActionIcon m={"md"} variant="transparent" color="white">
            <BsInfoSquare color="white" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <SimpleGrid p={"xs"}>
            <Text size="sm">Subject: Math</Text>
            <Text size="sm">Class Time: 10:10 AM</Text>
            <Text size="sm">Days: Wednesday</Text>
          </SimpleGrid>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default ClassroomInfoMenu;
