import { useCurrentCustomer } from "@/entities/customer/hooks/useCurrentCustomer";
import { useGetGroup } from "@/entities/group/hooks/useGetGroup";
import { PropsWithChildren, useMemo } from "react";
import { LoadingWidget } from "@/widgets/loadingWidget/ui/loadingWidget";
import { LowGroupWidget } from "@/widgets/loadingWidget/ui/lowGroupWidget";

export const FetchProvider = ({ children }: PropsWithChildren) => {
  const { data: currentUser, isLoading: isLoadingCustomer } =
    useCurrentCustomer();
  const { isLoading: isLoadingGroup, isPending } = useGetGroup({
    enabled: !!currentUser?.groupId,
  });

  const isLoading = useMemo(
    () => isLoadingCustomer || isLoadingGroup || isPending,
    [isLoadingCustomer, isLoadingGroup, isPending],
  );

  const hasGroup = useMemo(
    () => !!currentUser?.groupId,
    [currentUser?.groupId],
  );
  // TODO: Если у старосты нет группы, зависает
  if (isLoading) {
    return <LoadingWidget />;
  }

  if (!hasGroup) {
    return <LowGroupWidget />;
  }

  return children;
};
