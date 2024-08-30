import {
  ClassroomApiResponse,
  CreateClassroomRequest,
} from "@/modules/Dasboard/components/ClassroomFormModal/ClassroomFormModal.helpers";

import projectApi from "../api.config";

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createClassroom: builder.mutation<ClassroomApiResponse, CreateClassroomRequest>({
      query: (newClassroom) => ({
        url: "/classrooms",
        method: "POST",
        body: newClassroom,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateClassroomMutation } = classroomsApi;
