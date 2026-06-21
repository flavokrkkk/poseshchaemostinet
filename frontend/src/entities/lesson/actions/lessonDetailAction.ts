import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { ERouteNames } from "@/shared";

export const lessonDetailAction = async ({
  params: { lessonId },
}: LoaderFunctionArgs) => {
  if (!lessonId) return redirect(`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`);

  return lessonId;
};
