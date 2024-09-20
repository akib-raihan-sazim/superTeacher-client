import { useState } from "react";

import { Button, Collapse, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import dayjs from "dayjs";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

import { useGetExamsQuery } from "@/shared/redux/rtk-apis/exams/exams.api";

import ExamCard from "../ExamCard/ExamCard";
import { IExamsProps } from "./ExamList.interface";
import { useStyles } from "./ExamList.styles";

const ExamList: React.FC<IExamsProps> = ({ classroomId }) => {
  const { classes } = useStyles();
  const [toggleExamsCollapse, setToggleExamsCollapse] = useState(true);

  const { data: exams, isLoading, error } = useGetExamsQuery({ classroomId });

  const pastExams = exams?.filter((exam) => dayjs(exam.date).isBefore(dayjs()));
  const futureExams = exams?.filter((exam) => dayjs(exam.date).isAfter(dayjs()));

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
        ) : error ? (
          <Title order={4} className={classes.errorTitle}>
            Failed to load exams.
          </Title>
        ) : (
          <>
            {futureExams && futureExams.length !== 0 && (
              <SimpleGrid px={{ base: "", xs: "sm" }}>
                {futureExams.map((exam) => (
                  <ExamCard exam={exam} key={exam.id} />
                ))}
              </SimpleGrid>
            )}
            {pastExams && pastExams.length !== 0 && (
              <SimpleGrid px={{ base: "", xs: "sm" }}>
                {pastExams && pastExams.length !== 0 && (
                  <>
                    {pastExams.map((exam) => (
                      <ExamCard exam={exam} key={exam.id} isPast />
                    ))}
                  </>
                )}
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
