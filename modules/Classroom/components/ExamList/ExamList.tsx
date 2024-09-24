import { SimpleGrid, Title, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useGetExamsQuery } from "@/shared/redux/rtk-apis/exams/exams.api";

import ExamCard from "../ExamCard/ExamCard";
import { filterExamsByDate } from "./ExamList.helpers";
import { IExamsProps } from "./ExamList.interface";
import { useStyles } from "./ExamList.styles";

const ExamList: React.FC<IExamsProps> = ({ classroomId }) => {
  const { classes } = useStyles();
  const user = useAppSelector(selectAuthenticatedUser);
  const {
    data: exams,
    isLoading,
    error,
  } = useGetExamsQuery({ classroomId }, { skip: !classroomId || !user.userId });

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
      {isLoading ? (
        <Loader size="sm" />
      ) : (
        <>
          {futureExams && futureExams.length > 0 && (
            <SimpleGrid px={{ base: "", xs: "sm" }}>
              {futureExams.map((exam) => (
                <ExamCard exam={exam} key={exam.id} />
              ))}
            </SimpleGrid>
          )}

          {pastExams && pastExams.length > 0 && (
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
    </>
  );
};

export default ExamList;
