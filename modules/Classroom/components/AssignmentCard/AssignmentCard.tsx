import { useState } from "react";

import { Card, Flex, Text, Group, Button, Menu, ActionIcon } from "@mantine/core";
import dayjs from "dayjs";
import { AiOutlineFileText } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";

import ConfirmDeleteAssignmentModal from "../ConfirmDeleteAssignmentModal/ConfirmDeleteAssignmentModal";
import CreateAssignmentFormModal from "../CreateAssignmentFormModal/CreateAssignmentFormModal";
import SubmissionsModal from "../SubmissionsModal/SubmissionsModal";
import SubmitAssignmentModal from "../SubmitAssignmentModal/SubmitAssignmentModal";
import { IAssignmentCardProps } from "./AssignmentCard.interface";
import { useStyles } from "./AssignmentCard.styles";

const AssignmentCard: React.FC<IAssignmentCardProps> = ({ assignment, classroomId }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [submitModalOpened, setSubmitModalOpened] = useState(false);
  const [submissionsModalOpened, setSubmissionsModalOpened] = useState(false);
  const { classes } = useStyles();

  return (
    <>
      <Card my="md" px={{ base: "xs", sm: "md", md: "lg" }} className={classes.card}>
        {user?.userType === "teacher" && (
          <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent" color="white" className={classes.actionIcon}>
                <HiDotsHorizontal />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => setEditModalOpened(true)}>Edit</Menu.Item>
              <Menu.Item color="red" onClick={() => setDeleteModalOpened(true)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}

        <Flex justify="space-between" wrap="wrap" align="center">
          <Flex align="center">
            <span className={classes.iconContainer}>
              <AiOutlineFileText />
            </span>
            <Text fw={700}>{assignment.title}</Text>
          </Flex>
        </Flex>

        <Text my="md">{assignment.description}</Text>

        <Group position="right">
          <Button rightIcon={<FaDownload />} className={classes.viewButton} size="compact-sm">
            Download
          </Button>
        </Group>
        <Group position="right" pt={"md"}>
          <Text>
            Due Date:
            <Text component="span" fw={700} pl={"5px"}>
              {dayjs(assignment.dueDate).format("MMMM D, YYYY")}
            </Text>
          </Text>
          {user?.userType === "teacher" ? (
            <Button
              className={classes.submissionButton}
              onClick={() => setSubmissionsModalOpened(true)}
            >
              Submissions
            </Button>
          ) : (
            <Button className={classes.submissionButton} onClick={() => setSubmitModalOpened(true)}>
              Submit
            </Button>
          )}
        </Group>
      </Card>

      <CreateAssignmentFormModal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        classroomId={classroomId}
        assignment={assignment}
      />

      <ConfirmDeleteAssignmentModal
        classroomId={classroomId}
        assignmentId={assignment.id}
        isOpen={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
      />
      {user?.userId && (
        <SubmitAssignmentModal
          opened={submitModalOpened}
          onClose={() => setSubmitModalOpened(false)}
          assignmentId={assignment.id}
          classroomId={classroomId}
          userId={user.userId}
        />
      )}
      <SubmissionsModal
        opened={submissionsModalOpened}
        onClose={() => setSubmissionsModalOpened(false)}
        assignmentId={assignment.id}
        classroomId={classroomId}
        dueDate={assignment.dueDate}
      />
    </>
  );
};

export default AssignmentCard;
