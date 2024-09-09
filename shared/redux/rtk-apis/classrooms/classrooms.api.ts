import { Classroom } from "@/modules/Dasboard/components/ClassroomCardList/ClassroomCardList.types";
import {
  ClassroomApiResponse,
  CreateClassroomRequest,
} from "@/modules/Dasboard/components/ClassroomFormModal/ClassroomFormModal.helpers";

import enhancedProjectApi from "../api.config";

const classroomsApi = enhancedProjectApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassrooms: builder.query<Classroom[], void>({
      query: () => ({
        url: "/classrooms",
        method: "GET",
      }),
      providesTags: [{ type: "Classrooms", id: "LIST" }],
    }),
    createClassroom: builder.mutation<ClassroomApiResponse, CreateClassroomRequest>({
      query: (newClassroom) => ({
        url: "/classrooms",
        method: "POST",
        body: newClassroom,
      }),
      invalidatesTags: [{ type: "Classrooms", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetClassroomsQuery, useCreateClassroomMutation } = classroomsApi;
