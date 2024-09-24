import { projectApi } from "../api.config";
import { CreateResourceDto, IClassworkResource } from "./classworks.interface";

const classworksApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassroomResources: builder.query<IClassworkResource[], number>({
      query: (classroomId) => ({
        url: `/classworks/${classroomId}/resources`,
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
          url: `/classworks/${classroomId}/resources`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["ClassworkResources"],
    }),

    deleteResource: builder.mutation<void, { classroomId: number; resourceId: number }>({
      query: ({ classroomId, resourceId }) => ({
        url: `/classworks/${classroomId}/resources/${resourceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClassworkResources"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassroomResourcesQuery,
  useUploadResourceMutation,
  useDeleteResourceMutation,
} = classworksApi;
