import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";
import { EditableUserFields, IUser } from "./users.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
    }),

    getUserDetails: builder.query<IUser, void>({
      query: () => "users/user-details",
      providesTags: ["Profiles"],
    }),

    editUser: builder.mutation<IUser, EditableUserFields>({
      query: (editUserData) => ({
        url: "users/edit",
        method: "PUT",
        body: editUserData,
      }),
      invalidatesTags: ["Profiles"],
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery, useGetUserDetailsQuery, useEditUserMutation } = usersApi;
