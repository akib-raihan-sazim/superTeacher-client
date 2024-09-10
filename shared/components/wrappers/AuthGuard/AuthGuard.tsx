import React, { PropsWithChildren, useEffect } from "react";

import { useRouter } from "next/router";

import LoadingComponent from "../../LoadingComponent";
import { useSessionContext } from "../AppInitializer/AppInitializerContext";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isLoading, error, user } = useSessionContext();
  const isUnauthenticated = !isLoading && (error || !user);

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (!isLoading && isUnauthenticated) {
      router.push("/login");
    }
  }, [router, isLoading, error, isUnauthenticated]);

  if (isLoading) return <LoadingComponent visible={true} />;

  return <>{children}</>;
};

export default AuthGuard;
