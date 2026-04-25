import { ArrowRight } from "iconsax-reactjs";

import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <ArrowRight
        className="block md:hidden"
        onClick={() => navigate(`/account`)}
      />
      <div className="hidden h-1.5 w-1.5 rounded-full bg-black md:block" />
    </>
  );
};

export default BackButton;
