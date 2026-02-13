import { Edit2 } from "iconsax-reactjs";

function ProfileHeader() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Left: Name + Phone */}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-800">{name}</span>

        <span className="text-sm text-gray-500">{phone}</span>
      </div>

      {/* Right: Edit Button */}
      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-50 transition hover:bg-gray-100">
        <Edit2 size="20" className="text-gray-600" />
      </button>
    </div>
  );
}

export default ProfileHeader;
