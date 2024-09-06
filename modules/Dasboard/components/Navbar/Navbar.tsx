import React from "react";

import { ActionIcon, Anchor, Button, Group, Menu, Title } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

import { TRootState } from "@/shared/redux/store";

import { useStyles } from "./Navbar.styles";

const Navbar = () => {
  const user = useSelector((state: TRootState) => state.auth.user);
  const { classes } = useStyles();

  return (
    <Group className={classes.navbar}>
      <Anchor className={classes.logo}>
        <Title className={classes.logoTitle} order={4}>
          Superteacher
        </Title>
      </Anchor>

      <Group>
        <Anchor className={classes.dashboardLink}>
          <Title className={classes.dashboardTitle} order={5}>
            Dashboard
          </Title>
        </Anchor>
        {user?.userType === "teacher" && (
          <ActionIcon>
            <FaPlus color="white" />
          </ActionIcon>
        )}
        <Menu
          shadow="xl"
          transitionProps={{ transition: "pop-top-right", duration: 200 }}
          withArrow
          offset={3}
          position="bottom-end"
        >
          <Menu.Target>
            <Button className={classes.userButton}>{user ? `${user.firstName}` : "User"}</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Navbar;
