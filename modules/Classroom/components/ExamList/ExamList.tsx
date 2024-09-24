import { useState } from "react";

import { Button, Collapse, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

import { useGetExamsQuery } from "@/shared/redux/rtk-apis/exams/exams.api";

import ExamCard from "../ExamCard/ExamCard";
import { filterExamsByDate } from "./ExamList.helpers";
import { IExamsProps } from "./ExamList.interface";
import { useStyles } from "./ExamList.styles";

const ExamList: React.FC<IExamsProps> = ({ classroomId }) => {
  const { classes } = useStyles();
  const [toggleExamsCollapse, setToggleExamsCollapse] = useState(true);
  const {
    data: exams,
    isLoading,
    error,
  } = useGetExamsQuery({ classroomId }, { skip: !classroomId });

  if (error) {
    showNotification({
      title: "Error",
      message: "Failed to load exams.",
      color: "red",
    });
  }

  const { pastExams, futureExams } = exams
    ? filterExamsByDate(exams)
    : { pastExams: [], futureExams: [] };

  return (
    <>
      <Flex>
        <Button
          variant="subtle"
          size="compact"
          leftIcon={
            toggleExamsCollapse ? <FaChevronDown color="white" /> : <FaChevronRight color="white" />
          }
          className={classes.titleButton}
          onClick={() => setToggleExamsCollapse(!toggleExamsCollapse)}
        >
          <Title my={"md"} order={3} className={classes.collapseTitle}>
            Exams
          </Title>
        </Button>
      </Flex>

      <Collapse in={toggleExamsCollapse} transitionDuration={0} animateOpacity={false}>
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          <>
            {futureExams && futureExams?.length > 0 && (
              <SimpleGrid px={{ base: "", xs: "sm" }}>
                {futureExams.map((exam) => (
                  <ExamCard exam={exam} key={exam.id} />
                ))}
              </SimpleGrid>
            )}

            {pastExams && pastExams?.length > 0 && (
              <SimpleGrid px={{ base: "", xs: "sm" }}>
                {pastExams.map((exam) => (
                  <ExamCard exam={exam} key={exam.id} isPast />
                ))}
              </SimpleGrid>
            )}

            {futureExams?.length === 0 && pastExams?.length === 0 && (
              <Title order={4} className={classes.noExamsTitle}>
                No Exams available
              </Title>
            )}
          </>
        )}
      </Collapse>
    </>
  );
};

export default ExamList;
