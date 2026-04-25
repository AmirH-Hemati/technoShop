import { Add } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";

function UserAvatar() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1 rounded-xl from-[oklch(0.95_0.02_262.881)] to-white md:flex-col md:items-center md:gap-3 md:bg-gradient-to-b md:p-4">
      {/* Avatar */}
      <div
        className="relative cursor-pointer"
        onClick={() => navigate("/account")}
      >
        <img
          src={user?.photo}
          alt={user?.name}
          className="h-10 w-10 rounded-full border-4 border-white object-cover shadow-md md:h-24 md:w-24"
        />

        <div className="bg-grey-0 absolute right-0 bottom-0 flex h-5 w-5 items-center justify-center rounded-full shadow-md md:h-7 md:w-7">
          <Add className="text-primary" size={14} />
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-col leading-tight md:items-center md:text-center">
        <span className="text-300 text-grey-800 font-semibold">
          {user?.name}
        </span>

        <span className="text-200 text-gray-700">
          {user?.phone || "شماره ثبت نشده"}
        </span>
      </div>
    </div>
  );
}

export default UserAvatar;
