import { useState } from "react";

import { ActionIcon, Anchor, Box, Button, Flex, Title } from "@mantine/core";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";

import ConfirmDeleteMeetLinkModal from "../ConfirmDeleteMeetLinkModal/ConfirmDeleteMeetLinkModal";
import UploadMeetlinkModal from "../UploadOrEditMeetLinkModal/UploadOrEditMeetLinkModal";
import { TClassroomMeetlinkProps } from "./ClassroomMeetlink.interface";
import { useMeetlinkStyles } from "./ClassroomMeetlink.styles";

const ClassroomMeetlink = ({ meetlink, classroomId }: TClassroomMeetlinkProps) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const { classes } = useMeetlinkStyles();
  const [meetLinkModalOpened, setMeetLinkModalOpened] = useState(false);
  const [confirmDeleteModalOpened, setConfirmDeleteModalOpened] = useState(false);
  const [initialMeetLink, setInitialMeetLink] = useState("");

  const handleEditClick = () => {
    setInitialMeetLink(meetlink || "");
    setMeetLinkModalOpened(true);
  };

  if (meetlink) {
    return (
      <Box className={classes.boxDetails}>
        <Title order={4}>Meet link</Title>
        <Flex justify={"center"} align={"center"} gap={12} mt={6}>
          <Anchor href={meetlink} size="sm" target="_blank">
            Join Google Meet
          </Anchor>
          {user.userType === "teacher" ? (
            <>
              <ActionIcon onClick={handleEditClick}>
                <TbEditCircle className={classes.icon} color="black" />
              </ActionIcon>
              <ActionIcon onClick={() => setConfirmDeleteModalOpened(true)}>
                <FaTrashAlt className={classes.icon} color="black" />
              </ActionIcon>
            </>
          ) : null}
        </Flex>
        <ConfirmDeleteMeetLinkModal
          classroomId={classroomId}
          isOpen={confirmDeleteModalOpened}
          onClose={() => setConfirmDeleteModalOpened(false)}
        />
        <UploadMeetlinkModal
          opened={meetLinkModalOpened}
          onClose={() => setMeetLinkModalOpened(false)}
          classroomId={classroomId}
          initialValue={initialMeetLink}
        />
      </Box>
    );
  }
  if (user.userType === "teacher") {
    return (
      <>
        <Button
          w={"100%"}
          mb={10}
          c={"#4CAF50"}
          color="#4CAF50"
          style={{ border: "1px solid #4CAF50" }}
          leftIcon={<FaPlus />}
          onClick={() => setMeetLinkModalOpened(true)}
        >
          Add meet link
        </Button>
        <UploadMeetlinkModal
          opened={meetLinkModalOpened}
          onClose={() => setMeetLinkModalOpened(false)}
          classroomId={classroomId}
        />
      </>
    );
  }

  return null;
};

export default ClassroomMeetlink;
