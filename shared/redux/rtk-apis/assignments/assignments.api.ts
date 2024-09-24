import { projectApi } from "../api.config";
import {
  AssignmentsResponseDto,
  CreateAssignmentDto,
  IApiSubmissionResponse,
  StudentResponseDto,
} from "./assignments.interface";

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
      invalidatesTags: (_, __, { classroomId }) => [{ type: "Assignments", id: classroomId }],
    }),

    getClassroomAssignments: builder.query<AssignmentsResponseDto[], number>({
      query: (classroomId) => ({
        url: `/classrooms/${classroomId}/assignments`,
        method: "GET",
      }),
      providesTags: (_, __, classroomId) => [{ type: "Assignments", id: classroomId }],
    }),

    updateAssignment: builder.mutation<
      AssignmentsResponseDto,
      { classroomId: number; assignmentId: number; data: CreateAssignmentDto }
    >({
      query: ({ classroomId, assignmentId, data }) => {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("dueDate", data.dueDate.toISOString());

        return {
          url: `/classrooms/${classroomId}/assignments/${assignmentId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (_, __, { classroomId }) => [{ type: "Assignments", id: classroomId }],
    }),

    deleteAssignment: builder.mutation<void, { classroomId: number; assignmentId: number }>({
      query: ({ assignmentId, classroomId }) => ({
        url: `/classrooms/${classroomId}/assignments/${assignmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { classroomId }) => [{ type: "Assignments", id: classroomId }],
    }),

    submitAssignment: builder.mutation<
      void,
      { assignmentId: number; classroomId: number; userId: number; file: File }
    >({
      query: ({ classroomId, assignmentId, userId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("assignmentId", assignmentId.toString());
        formData.append("userId", userId.toString());
        return {
          url: `classrooms/${classroomId}/assignments/${assignmentId}/submit-assignment`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_, __, { classroomId }) => [{ type: "Assignments", id: classroomId }],
    }),

    getAssignmentSubmissions: builder.query<
      StudentResponseDto[],
      { assignmentId: number; classroomId: number }
    >({
      query: ({ assignmentId, classroomId }) => ({
        url: `classrooms/${classroomId}/assignments/${assignmentId}/submissions`,
        method: "GET",
      }),
      providesTags: ["Assignments"],
      transformResponse: (response: IApiSubmissionResponse[]): StudentResponseDto[] =>
        response.map((submission) => ({
          firstName: submission.student.user.firstName.trim(),
          lastName: submission.student.user.lastName.trim(),
          fileUrl: submission.fileUrl,
          createdAt: submission.createdAt,
        })),
    }),

    getSubmissionStatus: builder.query<
      { submitted: boolean },
      { assignmentId: number; userId: number }
    >({
      query: ({ assignmentId, userId }) =>
        `/assignments/${assignmentId}/user/${userId}/submission-status`,
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
  useGetAssignmentSubmissionsQuery,
  useGetSubmissionStatusQuery,
} = assignmentsApi;
