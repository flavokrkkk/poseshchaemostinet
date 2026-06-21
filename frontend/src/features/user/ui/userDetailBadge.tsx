import { Customer } from "@/entities";
import { Image } from "@/shared";
import { UserAchievementsProgress } from "./userAchievementsProgress";

interface UserDetailBadgeProps {
  customer: Customer;
}

export const UserDetailBadge = ({ customer }: UserDetailBadgeProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <div className="min-w-20 h-20 overflow-hidden rounded-lg">
          <Image
            src={customer.avatarUrl ?? "/images/profile.png"}
            alt="Аватар пользователя"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-center flex-col">
          <h1 className="text-lg font-semibold">{customer.fullName}</h1>
          <p className="text-sm text-gray-500 leading-4">
            Текст описания о себе, краткая информация...
          </p>
        </div>
      </div>
      <UserAchievementsProgress progress={50} />
    </div>
  );
};
