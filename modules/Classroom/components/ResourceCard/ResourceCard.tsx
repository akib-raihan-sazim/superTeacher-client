import { Card, Flex, Text, Button, Group, Menu, ActionIcon } from "@mantine/core";
import { AiOutlineBook } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";

import { IResourceCardProps } from "./ResourceCard.interface";
import { useStyles } from "./ResourceCard.styles";

const ResourceCard: React.FC<IResourceCardProps> = ({ resource }) => {
  const { classes } = useStyles();
  const user = useAppSelector(selectAuthenticatedUser);

  return (
    <Card my={"md"} px={{ base: "xs", sm: "md", md: "lg" }} className={classes.card}>
      {user?.userType === "teacher" && (
        <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="transparent" color="white" className={classes.actionIcon}>
              <HiDotsHorizontal />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}

      <Flex justify="space-between" wrap="wrap" align="center">
        <Flex align="center">
          <span className={classes.iconContainer}>
            <AiOutlineBook />
          </span>
          <Text fw={700}>{resource.title}</Text>
        </Flex>
      </Flex>

      <Text my={"md"}>{resource.description}</Text>

      <Group position="right">
        <Button rightIcon={<FaDownload />} className={classes.downloadButton} size="compact-sm">
          Download
        </Button>
      </Group>
    </Card>
  );
};

export default ResourceCard;
