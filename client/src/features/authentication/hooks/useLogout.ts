import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { userAuthStore } from "@/context/AuthStore.js";

import { logout as logoutApi } from "../../../services/apiAuth.js";

export function useLogout() {
  const logoutStore = userAuthStore((state) => state.logout);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/", { replace: true });
      logoutStore();
    },
  });

  return { logout, isPending };
}
