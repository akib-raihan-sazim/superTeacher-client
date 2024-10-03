import { showNotification } from "@mantine/notifications";
import { Dispatch } from "@reduxjs/toolkit";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { clearUser } from "@/shared/redux/reducers/user.reducer";
import projectApi from "@/shared/redux/rtk-apis/api.config";

const INACTIVITY_TIMEOUT = 60 * 60 * 1000;

export const setupAutoLogout = (dispatch: Dispatch, router: { push: (path: string) => void }) => {
  let inactivityTimer: NodeJS.Timeout;

  const resetTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    if (accessToken) {
      inactivityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
    }
  };

  const logout = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    if (accessToken) {
      dispatch(projectApi.util.resetApiState());
      dispatch(clearUser());
      localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
      router.push("/login");
      showNotification({
        title: "Session Expired",
        message: "You have been logged out due to inactivity.",
        color: "yellow",
      });
      cleanup();
    }
  };

  const activityEvents = ["mousedown", "keydown", "touchstart", "scroll"];

  const handleActivity = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    if (accessToken) {
      resetTimer();
    }
  };

  activityEvents.forEach((event) => {
    window.addEventListener(event, handleActivity);
  });

  resetTimer();

  const cleanup = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    activityEvents.forEach((event) => {
      window.removeEventListener(event, handleActivity);
    });
  };

  return cleanup;
};
