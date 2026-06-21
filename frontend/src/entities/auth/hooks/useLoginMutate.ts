import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import {
  setAccessToken,
  setRefreshToken,
} from "@/entities/token/lib/tokenService";
import { ERouteNames } from "@/shared";

export const LOGIN_QUERY = "login-query";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [LOGIN_QUERY],
    mutationFn: login,
    onSuccess: (data) => {
      if (!data) return;

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      if (data.user.role === "ELDER") {
        return navigate(`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`);
      }

      if (data.user.role === "STUDENT") {
        return navigate(`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}`);
      }
    },
  });
};
