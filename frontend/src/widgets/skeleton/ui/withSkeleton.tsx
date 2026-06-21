import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface WithSkeletonProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  isEmpty?: boolean;
  empty?: React.ReactNode;
  children: React.ReactNode;
}

export const WithSkeleton: React.FC<WithSkeletonProps> = ({
  isLoading,
  skeleton,
  isEmpty,
  empty,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {skeleton}
        </motion.div>
      ) : isEmpty ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {empty ?? null}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
