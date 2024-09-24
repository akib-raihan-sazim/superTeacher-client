import { projectApi } from "../api.config";
import { CreateResourceDto, IClassworkResource, UpdateResourceDto } from "./classworks.interface";

const classworksApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassroomResources: builder.query<IClassworkResource[], number>({
      query: (classroomId) => ({
        url: `/classrooms/${classroomId}/resources`,
        method: "GET",
      }),
      providesTags: ["ClassworkResources"],
    }),

    uploadResource: builder.mutation<IClassworkResource, CreateResourceDto>({
      query: ({ file, classroomId, title, description }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);

        return {
          url: `/classrooms/${classroomId}/resources`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["ClassworkResources"],
    }),

    deleteResource: builder.mutation<void, { classroomId: number; resourceId: number }>({
      query: ({ classroomId, resourceId }) => ({
        url: `/classrooms/${classroomId}/resources/${resourceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClassworkResources"],
    }),

    updateResource: builder.mutation<
      IClassworkResource,
      { classroomId: number; resourceId: number; data: UpdateResourceDto }
    >({
      query: ({ classroomId, resourceId, data }) => {
        const formData = new FormData();
        if (data.file) formData.append("file", data.file);
        formData.append("title", data.title);
        formData.append("description", data.description);

        return {
          url: `/classrooms/${classroomId}/resources/${resourceId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["ClassworkResources"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassroomResourcesQuery,
  useUploadResourceMutation,
  useDeleteResourceMutation,
  useUpdateResourceMutation,
} = classworksApi;
