import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TRootState } from "@/shared/redux/store";

import { EUserRole, TTokenizedUser } from "../rtk-apis/auth/auth.types";

interface IAuthenticatedUser {
  id: number | null;
  userId: number | null;
  email: string | null;
  firstName: string | null;
  userType: EUserRole | null;
}

const initialState: IAuthenticatedUser = {
  id: null,
  userId: null,
  email: null,
  firstName: null,
  userType: null,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TTokenizedUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.userType = action.payload.userType;
      state.userId = action.payload.id;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.userType = null;
      state.userId = null;
    },
  },
});

export const { setUser, clearUser } = authenticatedUserSlice.actions;

export const selectAuthenticatedUser = (state: TRootState) => state.authenticatedUser;

export default authenticatedUserSlice.reducer;
