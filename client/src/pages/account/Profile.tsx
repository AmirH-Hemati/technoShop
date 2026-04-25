import { Edit2 } from "iconsax-reactjs";

import { Link } from "react-router-dom";

import AccountMobileMenu from "@/ui/AccountMobileMenu.js";

import UserAvatar from "@/features/authentication/components/UserAvatar.js";
import OrderStatusSummary from "@/features/orders/components/OrderStatusSummary.js";
import PreviousOrder from "@/features/orders/components/PreviousOrder.js";

function Profile() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between lg:hidden">
        <UserAvatar />
        <Link to={`/account/personalInfo`}>
          <Edit2 size={24} className="text-gray-600" />
        </Link>
      </div>

      <OrderStatusSummary />
      <AccountMobileMenu />

      <PreviousOrder />
    </div>
  );
}

export default Profile;
