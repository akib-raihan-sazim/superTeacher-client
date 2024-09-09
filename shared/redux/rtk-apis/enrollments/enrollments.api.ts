import { projectApi } from "../api.config";
import { IEnrollment, IStudent } from "./enrollments.types";

const enrollmentApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassroomStudents: builder.query<IEnrollment[], number>({
      query: (classroomId) => `enrollments/students/${classroomId}`,
      providesTags: ["Enrollments"],
    }),
    getUnenrolledStudents: builder.query<IStudent[], { classroomId: number }>({
      query: ({ classroomId }) => ({
        url: `students/unenrolled/${classroomId}`,
      }),
      providesTags: ["UnenrolledStudents"],
    }),
    enrollStudent: builder.mutation<void, { studentId: number; classroomId: number }>({
      query: ({ studentId, classroomId }) => ({
        url: `/enrollments`,
        method: "POST",
        body: {
          studentId,
          classroomId,
        },
      }),
      invalidatesTags: ["Enrollments", "UnenrolledStudents"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassroomStudentsQuery,
  useGetUnenrolledStudentsQuery,
  useEnrollStudentMutation,
} = enrollmentApi;
