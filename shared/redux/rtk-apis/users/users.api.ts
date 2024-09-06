import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery } = usersApi;
