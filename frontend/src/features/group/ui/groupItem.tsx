import { Image } from "@/shared";
import { motion } from "framer-motion";
import { Customer } from "@/entities";
import { ReactNode } from "react";
import { parseCustomerRole } from "@/entities/customer/types/constants";

interface GroupItemProps {
  customer: Customer;
  action: ReactNode;
}

export const GroupItem = ({ customer, action }: GroupItemProps) => {
  return (
    <section className="w-full last:border-b-0 border-b">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center justify-between p-3 bg-white rounded-2xl transition-all"
      >
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl overflow-hidden border">
            <Image src={customer.avatarUrl ?? ""} alt="customer-logo" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-medium">{customer.fullName}</h3>
            <span className="text-xs text-zinc-400">
              {parseCustomerRole[customer.role]}
            </span>
          </div>
        </div>
        {action}
      </motion.div>
    </section>
  );
};
