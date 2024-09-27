import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";
import { IUser, EditableUserFields } from "./users.types";

interface ResetPasswordRequest {
  oldPassword: string;
  newPassword: string;
}

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
    }),

    getUserDetails: builder.query<IUser, void>({
      query: () => "users/user-details",
      providesTags: ["Profile"],
    }),

    editUser: builder.mutation<IUser, EditableUserFields>({
      query: (editUserData) => ({
        url: "users/edit",
        method: "PUT",
        body: editUserData,
      }),
      invalidatesTags: ["Profile"],
    }),

    resetPassword: builder.mutation<void, ResetPasswordRequest>({
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
