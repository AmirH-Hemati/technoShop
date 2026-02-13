import { Edit2 } from "iconsax-reactjs";
import { Link } from "react-router-dom";
import UserAvatar from "../../features/authentication/userAvatar";
import OrderStatusSummary from "../../features/orders/OrderStatusSummary";
import PreviousOrder from "../../features/orders/previousOrder";
import AccountMobileMenu from "../../ui/AccountMobileMenu";
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
