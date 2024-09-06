import { projectApi } from "../api.config";
import { IEnrollment } from "./enrollments.types";

const enrollmentApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassroomStudents: builder.query<IEnrollment[], number>({
      query: (classroomId) => `enrollments/students/${classroomId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetClassroomStudentsQuery } = enrollmentApi;
