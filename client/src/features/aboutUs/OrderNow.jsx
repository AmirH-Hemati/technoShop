import { Call, Shop } from "iconsax-reactjs";
import { motion } from "motion/react";
function OrderNow() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0.5 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="bg-primary relative flex w-full flex-col items-center justify-center gap-8 rounded-xl px-4 py-8 shadow-2xl"
    >
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/15" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/15" />
      <h2 className="mb-7 text-center text-3xl font-bold text-white md:text-right md:text-4xl">
        سفارش خود را انجام بدهید
      </h2>
      <p className="text-grey-200 mb-9 max-w-2xl text-center text-lg md:text-right">
        همین امروز به کافینو بیایید و تجربه‌ای متفاوت از طعم و محیط را داشته
        باشید
      </p>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <button className="text-primary flex cursor-pointer items-center gap-2 rounded-full border-2 border-white bg-white px-7 py-4 font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          سفارش انلاین
          <Shop />
        </button>
        <button className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-white px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          تماس با ما
          <Call />
        </button>
      </div>
    </motion.div>
  );
}

export default OrderNow;
