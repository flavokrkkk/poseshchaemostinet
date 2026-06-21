import { useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ERouteNames } from "@/shared";
import { getAccessToken } from "@/entities/token/lib/tokenService";
import { useViewer } from "../model/context/providers";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginViewer } = useViewer();
  const pathname = useLocation();

  useLayoutEffect(() => {
    const token = getAccessToken();
    if (token) {
      loginViewer(token);
      return;
    }
    navigate(`/${ERouteNames.AUTH_ROUTE}/${ERouteNames.LOGIN_ROUTE}`);
  }, [pathname]);

  return { isAuthenticated };
};
