import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to={"/"} className="flex items-center gap-2 sm:gap-3">
      <img
        src="/logo.png"
        alt="logo image"
        className="h-[63px] w-[56px] object-contain sm:h-12 sm:w-12"
      />
      <span className="text-primary text-600 leading-[180%] font-bold">
        تکنوشاپ
      </span>
    </Link>
  );
}

export default Logo;
