import React from "react";

import { useRouter } from "next/router";

import { Anchor, Button, Group, Menu, Title } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { clearUser, selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

import { useStyles } from "./Navbar.styles";

const Navbar = () => {
  const user = useAppSelector(selectAuthenticatedUser);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    router.push("/login");
  };

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
        {user?.userType === EUserRole.TEACHER && (
          <FaPlus color="white" style={{ cursor: "pointer" }} />
        )}
        <Menu
          shadow="xl"
          transitionProps={{ transition: "pop-top-right", duration: 200 }}
          withArrow
          offset={3}
          position="bottom-end"
        >
          <Menu.Target>
            <Button className={classes.userButton}>{user?.firstName || "User"}</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Navbar;
