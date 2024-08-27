import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import {
  TLoginRequestFields,
  TLoginResponse,
  TStudentRegistrationFields,
  TStudentRegistrationResponse,
  TTeacherRegistrationFields,
  TTeacherRegistrationResponse,
} from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginRequestFields>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
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
