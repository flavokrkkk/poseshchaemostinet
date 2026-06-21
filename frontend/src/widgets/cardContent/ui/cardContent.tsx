import { PropsWithChildren, ReactNode } from "react";

interface CardContentProps extends PropsWithChildren {
  cardTitle?: ReactNode;
}

export const CardContent = ({ cardTitle, children }: CardContentProps) => {
  return (
    <div className="bg-white p-4 rounded-3xl space-y-4 shadow-md">
      {cardTitle && (
        <section className="flex items-center font-medium">{cardTitle}</section>
      )}
      {children}
    </div>
  );
};
