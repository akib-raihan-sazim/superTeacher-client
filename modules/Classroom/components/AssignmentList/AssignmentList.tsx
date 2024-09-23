import { useState } from "react";

import { Button, Collapse, Flex, SimpleGrid, Title, Loader, Center } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";

import { useGetClassroomAssignmentsQuery } from "@/shared/redux/rtk-apis/assignments/assignments.api";

import AssignmentCard from "../AssignmentCard/AssignmentCard";
import { IAssignmentsProps } from "./AssignmentList.interface";
import { useStyles } from "./AssignmentList.styles";

const AssignmentList: React.FC<IAssignmentsProps> = ({ classroomId }) => {
  const { classes } = useStyles();
  const [toggleAssignmentsCollapse, setToggleAssignmentsCollapse] = useState(true);

  const {
    data: assignments,
    isLoading,
    error,
  } = useGetClassroomAssignmentsQuery(classroomId, { skip: !classroomId });

  if (error) {
    showNotification({
      title: "Error",
      message: "Failed to load assignments. Please try again.",
      color: "red",
    });
  }

  return (
    <>
      <Flex>
        <Button
          variant="subtle"
          size="compact"
          leftIcon={
            isLoading ? (
              <Loader size="xs" color="white" />
            ) : toggleAssignmentsCollapse ? (
              <FaChevronDown color="white" />
            ) : (
              <FaChevronRight color="white" />
            )
          }
          className={classes.titleButton}
          onClick={() => setToggleAssignmentsCollapse(!toggleAssignmentsCollapse)}
        >
          <Title my={"md"} order={3} className={classes.collapseTitle}>
            Assignments
          </Title>
        </Button>
      </Flex>

      <Collapse in={toggleAssignmentsCollapse} transitionDuration={0} animateOpacity={false}>
        {isLoading ? (
          <Center my="lg">
            <Loader size="sm" />
          </Center>
        ) : null}

        {assignments && assignments.length > 0 ? (
          <SimpleGrid px={{ base: "", xs: "sm" }}>
            {assignments.map((assignment) => (
              <AssignmentCard
                assignment={assignment}
                classroomId={classroomId}
                key={assignment.id}
              />
            ))}
          </SimpleGrid>
        ) : null}

        {!isLoading && (!assignments || assignments.length === 0) ? (
          <Title order={4} className={classes.noAssignmentsTitle}>
            No Assignments available
          </Title>
        ) : null}
      </Collapse>
    </>
  );
};

export default AssignmentList;
