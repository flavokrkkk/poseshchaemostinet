import { FC, PropsWithChildren } from "react";
import { FetchProvider } from "@/shared/providers/fetchProvider";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { motion } from "framer-motion";

export const privatePage = (children: React.ReactNode) => {
  return <PrivatePage>{children}</PrivatePage>;
};

const PrivatePage: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthGuard();

  if (isAuthenticated) {
    return (
      <FetchProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </FetchProvider>
    );
  }

  return null;
};
