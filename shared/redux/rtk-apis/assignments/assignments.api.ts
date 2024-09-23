import { projectApi } from "../api.config";
import { AssignmentsResponseDto, CreateAssignmentDto } from "./assignments.interface";

const assignmentsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation<
      AssignmentsResponseDto,
      { classroomId: number; data: CreateAssignmentDto }
    >({
      query: ({ classroomId, data }) => {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("dueDate", data.dueDate.toISOString());

        return {
          url: `/classrooms/${classroomId}/assignments`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Assignments"],
    }),

    getClassroomAssignments: builder.query<AssignmentsResponseDto[], number>({
      query: (classroomId) => ({
        url: `/classrooms/${classroomId}/assignments`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
    }),

    updateAssignment: builder.mutation<
      AssignmentsResponseDto,
      { assignmentId: number; data: CreateAssignmentDto }
    >({
      query: ({ assignmentId, data }) => {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("dueDate", data.dueDate.toISOString());

        return {
          url: `/classrooms/assignments/${assignmentId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Assignments"],
    }),

    deleteAssignment: builder.mutation<void, number>({
      query: (assignmentId) => ({
        url: `/classrooms/assignments/${assignmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),

    submitAssignment: builder.mutation<void, { assignmentId: number; userId: number; file: File }>({
      query: ({ assignmentId, userId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("assignmentId", assignmentId.toString());
        formData.append("userId", userId.toString());

        return {
          url: "/classrooms/submit-assignment",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Assignments"],
    }),

    getSubmissionStatus: builder.query<
      { submitted: boolean },
      { assignmentId: number; userId: number }
    >({
      query: ({ assignmentId, userId }) =>
        `/classrooms/assignments/${assignmentId}/submission-status/${userId}`,
      providesTags: ["Assignments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAssignmentMutation,
  useGetClassroomAssignmentsQuery,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useSubmitAssignmentMutation,
  useGetSubmissionStatusQuery,
} = assignmentsApi;
