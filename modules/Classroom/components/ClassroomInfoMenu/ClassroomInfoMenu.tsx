import { ActionIcon, Box, Menu, SimpleGrid, Text } from "@mantine/core";
import { BsInfoSquare } from "react-icons/bs";

import { Classroom } from "@/modules/Dasboard/components/ClassroomCardList/ClassroomCardList.types";

import { useStyles } from "./ClassroomInfoMenu.styles";

interface ClassroomInfoMenuProps {
  classroom: Classroom;
}

const ClassroomInfoMenu: React.FC<ClassroomInfoMenuProps> = ({ classroom }) => {
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
            <Text size="sm">Subject: {classroom.subject}</Text>
            <Text size="sm">
              Class Time:{" "}
              {new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "UTC",
              }).format(new Date(classroom.classTime))}
            </Text>
            <Text size="sm">Days: {classroom.days.join(", ")}</Text>
          </SimpleGrid>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default ClassroomInfoMenu;
