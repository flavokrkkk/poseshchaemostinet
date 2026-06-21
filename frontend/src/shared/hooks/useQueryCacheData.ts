import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function useQueryCacheData<TData>(queryKey: unknown[]): TData {
  const queryClient = useQueryClient();
  return useMemo(
    () => queryClient.getQueryData<TData>(queryKey),
    [queryKey, queryClient]
  ) as TData;
}
