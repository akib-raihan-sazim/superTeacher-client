import { projectApi } from "../api.config";
import { CreateResourceDto, IClassworkResource } from "./classworks.interface";

const classworksApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
  }),
  overrideExisting: false,
});

export const { useUploadResourceMutation } = classworksApi;
