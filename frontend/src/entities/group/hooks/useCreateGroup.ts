import { useMutation } from "@tanstack/react-query";
import { createGroup } from "../api/groupService";
import { useNavigate } from "react-router-dom";
import { ERouteNames } from "@/shared";

// TODO: Ошибка при создании - navigate
export const useCreateGroup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      navigate(`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`);
    },
  });
};
