import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";
import { EditableUserFields, IUser, IResetPasswordRequest } from "./users.types";

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
        url: "users/user-details",
        method: "PUT",
        body: editUserData,
      }),
      invalidatesTags: ["Profiles"],
    }),
    resetPassword: builder.mutation<void, IResetPasswordRequest>({
      query: (resetPasswordData) => ({
        url: "users/reset-password",
        method: "PUT",
        body: resetPasswordData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useGetUserDetailsQuery,
  useEditUserMutation,
  useResetPasswordMutation,
} = usersApi;
