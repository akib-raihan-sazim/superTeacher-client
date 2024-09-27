import { useState } from "react";

import { Card, Flex, Text, Group, Button, Menu, ActionIcon } from "@mantine/core";
import dayjs from "dayjs";
import { AiOutlineFileText } from "react-icons/ai";
import { FaDownload, FaTrash } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useGetAssignmentDownloadUrlQuery } from "@/shared/redux/rtk-apis/assignments/assignments.api";
import { useGetSubmissionStatusQuery } from "@/shared/redux/rtk-apis/submissions/submissions.api";

import ConfirmDeleteAssignmentModal from "../ConfirmDeleteAssignmentModal/ConfirmDeleteAssignmentModal";
import ConfirmDeleteSubmissionModal from "../ConfirmDeleteSubmissionModal/ConfirmDeleteSubmissionModal";
import CreateAssignmentFormModal from "../CreateAssignmentFormModal/CreateAssignmentFormModal";
import SubmissionsModal from "../SubmissionsModal/SubmissionsModal";
import SubmitAssignmentModal from "../SubmitAssignmentModal/SubmitAssignmentModal";
import { IAssignmentCardProps } from "./AssignmentCard.interface";
import { useStyles } from "./AssignmentCard.styles";

const AssignmentCard: React.FC<IAssignmentCardProps> = ({ assignment, classroomId }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isDeleteSubmissionModalOpen, setIsDeleteSubmissionModalOpen] = useState(false);

  const { classes } = useStyles();
  const { data: submissionStatus } = useGetSubmissionStatusQuery(
    { assignmentId: assignment.id, userId: user?.userId ?? 0, classroomId: classroomId },
    { skip: !user || user.userType !== "student" },
  );

  const {
    data: downloadUrl,
    isFetching,
    isError,
  } = useGetAssignmentDownloadUrlQuery(
    { classroomId, assignmentId: assignment.id },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    } else {
      console.error("Download URL is undefined");
    }
  };

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
              <Menu.Item onClick={() => setIsEditModalOpen(true)}>Edit</Menu.Item>
              <Menu.Item color="red" onClick={() => setIsDeleteModalOpen(true)}>
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
          <Button
            rightIcon={<FaDownload />}
            className={classes.viewButton}
            size="compact-sm"
            loading={isFetching}
            onClick={handleDownload}
            disabled={isError || (!downloadUrl && !isFetching)}
          >
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
              onClick={() => setIsSubmissionModalOpen(true)}
            >
              Submissions
            </Button>
          ) : submissionStatus?.submitted ? (
            <Group>
              <Button className={classes.submissionButton} disabled>
                Submitted
              </Button>
              {submissionStatus.submissionId && (
                <ActionIcon color="red" onClick={() => setIsDeleteSubmissionModalOpen(true)}>
                  <FaTrash />
                </ActionIcon>
              )}
            </Group>
          ) : (
            <Button className={classes.submitButton} onClick={() => setIsSubmitModalOpen(true)}>
              Submit
            </Button>
          )}
        </Group>
      </Card>

      <CreateAssignmentFormModal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        classroomId={classroomId}
        assignment={assignment}
      />

      <ConfirmDeleteAssignmentModal
        classroomId={classroomId}
        assignmentId={assignment.id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      {user?.userId && (
        <SubmitAssignmentModal
          opened={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          assignmentId={assignment.id}
          classroomId={classroomId}
          userId={user.userId}
        />
      )}
      <SubmissionsModal
        opened={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        assignmentId={assignment.id}
        classroomId={classroomId}
        dueDate={assignment.dueDate}
      />
      {submissionStatus?.submissionId && (
        <ConfirmDeleteSubmissionModal
          submissionId={submissionStatus.submissionId}
          classroomId={classroomId}
          isOpen={isDeleteSubmissionModalOpen}
          onClose={() => setIsDeleteSubmissionModalOpen(false)}
        />
      )}
    </>
  );
};

export default AssignmentCard;
