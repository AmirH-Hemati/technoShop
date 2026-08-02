import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { userAuthStore } from "@/context/AuthStore.js";

export function AuthListener() {
  const navigate = useNavigate();
  const status = userAuthStore((state) => state.status);

  useEffect(() => {
    if (status === "unAuthenticated") {
      navigate("/");
    }
  }, [status, navigate]);

  return null;
}
