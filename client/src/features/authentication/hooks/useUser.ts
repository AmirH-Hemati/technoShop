import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { userAuthStore } from "@/context/AuthStore.js";

import { getCurrentUser } from "@/services/apiAuth.js";

export function useUser() {
  const { status, login, logout } = userAuthStore();

  const {
    data: user,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    enabled: status === "unknown",
  });

  useEffect(() => {
    if (user) {
      login();
    }
  }, [user, login]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  return { user, isLoading, error, isError, isAuthenticated: user?.role };
}
