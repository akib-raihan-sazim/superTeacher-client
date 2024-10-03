import { PropsWithChildren, useEffect } from "react";

import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";

import {
  NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
} from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useLazyMeQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { setupAutoLogout } from "@/shared/utils/autoLogout";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { AppInitializerContext } from "./AppInitializerContext";

const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [getMe, { isFetching, isLoading, error, data, isUninitialized }] = useLazyMeQuery();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    if (!accessToken) {
      return;
    }

    getMe()
      .unwrap()
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((err) => {
        const errorMessage = parseApiErrorMessage(err);
        showNotification({
          title: "Something went wrong",
          message: errorMessage,
          autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
          color: "red",
        });
      });

    const cleanup = setupAutoLogout(dispatch, router);

    return () => {
      cleanup();
    };
  }, [dispatch, getMe, router]);

  return (
    <AppInitializerContext.Provider
      value={{
        isLoading: isFetching || isLoading || isUninitialized,
        error,
        user: data,
        getMe,
      }}
    >
      {children}
    </AppInitializerContext.Provider>
  );
};

export default AppInitializer;
