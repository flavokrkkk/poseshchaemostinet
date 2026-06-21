import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ERouteNames } from "@/shared";
import { Image } from "@/shared/ui";
import { useCurrentCustomer } from "@/entities/customer/hooks/useCurrentCustomer";

interface RoleProtectedProps {
  requiredRole: string;
  fallbackPath?: string;
}

export const roleProtectedPage = (
  requiredRole: string,
  fallbackPath: string = `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}`,
) => {
  return (children: React.ReactNode) => (
    <RoleProtectedPage requiredRole={requiredRole} fallbackPath={fallbackPath}>
      {children}
    </RoleProtectedPage>
  );
};

const RoleProtectedPage: FC<PropsWithChildren & RoleProtectedProps> = ({
  children,
  requiredRole,
  fallbackPath,
}) => {
  const navigate = useNavigate();
  const { data: profile, isLoading: isProfileLoading } = useCurrentCustomer();
  const pathname = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isProfileLoading) {
      setIsReady(true);
    }
  }, [isProfileLoading, pathname]);

  if (!isReady || isProfileLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Image
          alt="logo-suspese"
          src="/images/logo.jpg"
          className="w-6 h-6 rounded-sm animate-ping"
        />
      </div>
    );
  }

  if (profile?.role && profile?.role !== requiredRole && fallbackPath) {
    navigate(fallbackPath);

    return null;
  }

  return children;
};
