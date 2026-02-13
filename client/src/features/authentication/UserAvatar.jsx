import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-50"
      onClick={() => navigate("/account")}
    >
      <img
        src={user?.photo}
        alt={user?.name}
        className="aspect-[1/1] h-0 min-h-full rounded-full border border-gray-200 object-cover shadow-sm"
      />

      <div className="flex flex-col gap-0.5 leading-tight">
        <span className="text-400 font-semibold text-gray-800">
          {user?.name}
        </span>

        <span className="text-300 text-gray-500">
          {user?.phone || "شماره ثبت نشده"}
        </span>
      </div>
    </div>
  );
}

export default UserAvatar;
