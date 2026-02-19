import { ArrowLeft } from "iconsax-reactjs";
import Button from "./Button.js";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
function WatchBanner() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeIn" }}
      viewport={{ once: true }}
      className="bg-primary shadow-xl flex flex-col items-center gap-6 overflow-hidden rounded-md px-4 py-6 sm:flex-row sm:gap-0 sm:px-12"
    >
      <div className="z-10 flex flex-1 flex-col items-center gap-5 sm:items-start">
        <h4 className="text-grey-0 text-600 leading-[180%] font-bold ">
          ساعت های هوشمند
        </h4>

        <p className="text-grey-0  leading-[180%] font-medium text-500">
          تجربه جذاب از آینده
        </p>

        <Button
          onClick={() => navigate("/products")}
          variation="secondary"
          size="small"
        >
          مشاهده محصولات
          <ArrowLeft size={18} />
        </Button>
      </div>

      <div className="relative flex h-48 flex-1 items-center justify-center md:h-full">
        <div className="background-circle-color absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 sm:h-60 sm:w-60 md:h-80 md:w-80" />
        <img
          src="/Frame 26086945.png"
          alt="Watch banner image"
          className="z-10 h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export default WatchBanner;
