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
    }),
  }),
  overrideExisting: false,
});

export const { useCreateMessageMutation } = messagesApi;
