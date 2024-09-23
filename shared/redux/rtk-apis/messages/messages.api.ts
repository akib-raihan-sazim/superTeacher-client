import { projectApi } from "../api.config";
import { CreateMessageDto, IMessage } from "./messages.interface";

const messagesApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<IMessage, CreateMessageDto>({
      query: (messageData) => ({
        url: "/messages",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["Messages"],
    }),

    getClassroomMessages: builder.query<IMessage[], number>({
      query: (classroomId) => ({
        url: `/messages/classroom/${classroomId}/messages`,
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateMessageMutation, useGetClassroomMessagesQuery } = messagesApi;
