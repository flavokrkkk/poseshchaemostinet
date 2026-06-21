import { Customer } from "@/entities";
import { Image } from "@/shared";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { Link } from "react-router-dom";

interface UserBadgeProps {
  customer: Customer;
  groupName: string;
}

export const UserBadge = ({ customer, groupName }: UserBadgeProps) => {
  return (
    <Link to={"profileId"}>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 overflow-hidden rounded-lg">
            <Image
              src={customer.avatarUrl ?? "/images/profile.png"}
              alt="Аватар пользователя"
              width={50}
              height={50}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-medium">{customer.fullName}</h1>
            <p className="text-sm text-zinc-400">{groupName}</p>
          </div>
        </div>
      </CardContent>
    </Link>
  );
};
