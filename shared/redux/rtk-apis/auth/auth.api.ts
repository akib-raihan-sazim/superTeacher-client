import projectApi from "../api.config";
import {
  ILoginFormValues,
  ILoginResponse,
  TStudentRegistrationFields,
  TStudentRegistrationResponse,
  TTeacherRegistrationFields,
  TTeacherRegistrationResponse,
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
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterStudentMutation, useRegisterTeacherMutation } = authApi;
