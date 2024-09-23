import { useState } from "react";

import { Button, Collapse, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";

import { useGetClassroomAssignmentsQuery } from "@/shared/redux/rtk-apis/assignments/assignments.api";

import AssignmentCard from "../AssignmentCard/AssignmentCard";
import { IAssignmentsProps } from "./AssignmentList.interface";
import { useStyles } from "./AssignmentList.styles";

const AssignmentList: React.FC<IAssignmentsProps> = ({ classroomId }) => {
  const { classes } = useStyles();
  const [toggleAssignmentsCollapse, setToggleAssignmentsCollapse] = useState(true);

  const { data: assignments, isLoading, error } = useGetClassroomAssignmentsQuery(classroomId);

  return (
    <>
      <Flex>
        <Button
          variant="subtle"
          size="compact"
          leftIcon={
            toggleAssignmentsCollapse ? (
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
          <Loader size="sm" />
        ) : error ? (
          <Title order={4} className={classes.errorTitle}>
            Failed to load assignments.
          </Title>
        ) : assignments && assignments.length !== 0 ? (
          <SimpleGrid px={{ base: "", xs: "sm" }}>
            {assignments.map((assignment) => (
              <AssignmentCard
                assignment={assignment}
                classroomId={classroomId}
                key={assignment.id}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Title order={4} className={classes.noAssignmentsTitle}>
            No Assignments available
          </Title>
        )}
      </Collapse>
    </>
  );
};

export default AssignmentList;
