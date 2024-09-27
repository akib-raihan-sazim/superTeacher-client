import projectApi from "../api.config";
import {
  ILoginFormValues,
  ILoginResponse,
  TStudentRegistrationFields,
  TStudentRegistrationResponse,
  TTeacherRegistrationFields,
  TTeacherRegistrationResponse,
  TResetPasswordResponse,
} from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginFormValues>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerStudent: builder.mutation<TStudentRegistrationResponse, TStudentRegistrationFields>({
      query: (data) => ({
        url: "auth/register/student",
        method: "POST",
        body: data,
      }),
    }),
    registerTeacher: builder.mutation<TTeacherRegistrationResponse, TTeacherRegistrationFields>({
      query: (data) => ({
        url: "/auth/register/teacher",
        method: "POST",
        body: data,
      }),
    }),
    generateResetPasswordOtp: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "auth/reset-password/generate-otp",
        method: "POST",
        body: data,
      }),
    }),

    validateOtp: builder.mutation<{ isValid: boolean }, { email: string; otp: string }>({
      query: (data) => ({
        url: "auth/reset-password/validate-otp",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      TResetPasswordResponse,
      { email: string; otp: string; newPassword: string }
    >({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterStudentMutation,
  useRegisterTeacherMutation,
  useGenerateResetPasswordOtpMutation,
  useResetPasswordMutation,
  useValidateOtpMutation,
} = authApi;
