import React from "react";

import { Anchor, Box, Button, Flex, Title } from "@mantine/core";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";

import { TClassroomMeetlinkProps } from "./ClassroomMeetlink.interface";
import { useMeetlinkStyles } from "./ClassroomMeetlink.styles";

const ClassroomMeetlink = ({ meetlink }: TClassroomMeetlinkProps) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const { classes } = useMeetlinkStyles();

  if (meetlink) {
    return (
      <Box className={classes.boxDetails}>
        <Title order={4}>Meet link</Title>
        <Flex justify={"center"} align={"center"} gap={12} mt={6}>
          <Anchor href="https://www.google.com" size="sm">
            www.google.com
          </Anchor>
          {user.userType === "teacher" ? (
            <>
              <TbEditCircle />
              <FaTrashAlt className={classes.icon} />
            </>
          ) : null}
        </Flex>
      </Box>
    );
  }
  if (user.userType === "teacher") {
    return (
      <Button
        w={"100%"}
        mb={10}
        c={"#4CAF50"}
        color="#4CAF50"
        style={{ border: "1px solid #4CAF50" }}
        leftIcon={<FaPlus />}
      >
        Add meet link
      </Button>
    );
  }

  return null;
};

export default ClassroomMeetlink;
