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
  }),
  overrideExisting: false,
});

export const {
  useCreateAssignmentMutation,
  useGetClassroomAssignmentsQuery,
  useUpdateAssignmentMutation,
} = assignmentsApi;
