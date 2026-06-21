import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { groupJoin } from "../api/groupService";
import { ERouteNames } from "@/shared";

export const groupInviteAction = async ({
  params: { inviteId },
}: LoaderFunctionArgs) => {
  if (!inviteId) return null;

  await groupJoin({ token: inviteId });

  return redirect(`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}`);
};
