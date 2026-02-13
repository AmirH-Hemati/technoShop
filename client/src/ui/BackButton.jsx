import { ArrowRight2 } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-grey-0 shadow-2 flex items-end justify-between rounded-xl md:hidden">
      <button
        className="flex items-center gap-2 rounded-xl px-4 py-2 transition hover:opacity-80"
        onClick={() => navigate(`/account`)}
      >
        <ArrowRight2 size={20} />
        <span className="text-xs">بازگشت به صفحه قبلی</span>
      </button>
    </div>
  );
};

export default BackButton;
