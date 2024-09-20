import dayjs from "dayjs";

import { ExamResponseDto } from "@/shared/redux/rtk-apis/exams/exams.interface";

export const filterExamsByDate = (exams: ExamResponseDto[]) => {
  const now = dayjs();
  const pastExams = exams.filter((exam) => dayjs(exam.date).isBefore(now));
  const futureExams = exams.filter((exam) => dayjs(exam.date).isAfter(now));
  return { pastExams, futureExams };
};
