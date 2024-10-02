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
    getClassroomById: builder.query<Classroom, number>({
      query: (id) => ({
        url: `/classrooms/${id}`,
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
    deleteClassroom: builder.mutation<void, number>({
      query: (classroomId) => ({
        url: `/classrooms/${classroomId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Classrooms", id: "LIST" }],
    }),
    updateClassroom: builder.mutation<
      ClassroomApiResponse,
      { classroomId: number; data: CreateClassroomRequest }
    >({
      query: ({ classroomId, data }) => ({
        url: `/classrooms/${classroomId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Classrooms", id: "LIST" }],
    }),

    uploadMeetLink: builder.mutation<void, { classroomId: number; meetlink: string }>({
      query: ({ classroomId, meetlink }) => ({
        url: `/classrooms/${classroomId}/meet-link`,
        method: "PUT",
        body: { meetLink: meetlink },
      }),
      invalidatesTags: [{ type: "Classrooms", id: "LIST" }],
    }),

    deleteMeetLink: builder.mutation<void, number>({
      query: (classroomId) => ({
        url: `/classrooms/${classroomId}/meet-link`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Classrooms", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassroomsQuery,
  useCreateClassroomMutation,
  useGetClassroomByIdQuery,
  useDeleteClassroomMutation,
  useUpdateClassroomMutation,
  useUploadMeetLinkMutation,
  useDeleteMeetLinkMutation,
} = classroomsApi;
