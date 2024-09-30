import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";
import { IUser } from "./users.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
    }),

    getUserDetails: builder.query<IUser, void>({
      query: () => "users/user-details",
      providesTags: ["Profiles"],
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery, useGetUserDetailsQuery } = usersApi;
