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
  }),
  overrideExisting: false,
});

export const { useCreateAssignmentMutation } = assignmentsApi;
