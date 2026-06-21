import { useMutation } from "@tanstack/react-query";
import { groupInvite } from "../api/groupService";

export const useCreateInvite = () => {
  return useMutation({
    mutationFn: groupInvite,
  });
};
