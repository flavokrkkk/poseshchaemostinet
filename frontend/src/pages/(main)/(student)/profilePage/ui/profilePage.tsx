import { Customer } from "@/entities";
import { CURRENT_CUSTOMER_QUERY } from "@/entities/customer/hooks/useCurrentCustomer";
import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { promoImages } from "@/features/promo/lib/mockPromo";
import { PromoSlider } from "@/features/promo/ui/promoSlider";
import { UserBadge } from "@/features/user/ui/userBadge";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { ProfileMenu } from "@/widgets/profileMenu/ui/profileMenu";

const ProfilePage = () => {
  const currentCustomer = useQueryCacheData<Customer>([CURRENT_CUSTOMER_QUERY]);
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);

  return (
    <div className="space-y-4 pb-4">
      <UserBadge customer={currentCustomer} groupName={currentGroup.name} />
      <PromoSlider images={promoImages} className="mt-4" />
      <ProfileMenu />
    </div>
  );
};

export default ProfilePage;
