import { ArrowLeft } from "iconsax-reactjs";
import Button from "./Button";
import Heading from "./Heading";
import DotGridPattern from "./DotGridPattern";
import { motion } from "motion/react";
function Banner() {
  return (
    <div className="flex h-auto flex-col items-center gap-1.5 sm:h-72 sm:flex-row md:gap-6">
      <motion.div
        initial={{ opacity: 0.5, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
        viewport={{ once: true }}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#1975B9] via-[#49D1E8] to-[#3CD7A8] px-4 py-4 shadow-xl sm:w-2/3 sm:flex-row sm:justify-start md:px-10"
      >
        <div className="w-full space-y-3 sm:w-1/2 md:space-y-6">
          <h3 className="text-600 leading-[140%] font-medium">
            آیفون های سری ۱۵
          </h3>
          <p className="text-300 mb-10 max-w-[60ch] font-semibold">
            برای آینده گوشی های هوشمند آماده شوید. نوآوری را مانند قبل تجربه
            کنید. منتظر پیش فروش بزرگ آیفون ۱۵ باشید.
          </p>

          <Button size="small">
            خرید
            <ArrowLeft size={18} />
          </Button>
        </div>
        <div className="absolute bottom-2 left-3 justify-end sm:flex sm:w-1/2">
          <img
            src="/phoneImages.png"
            alt="phone images"
            className="h-20 object-cover sm:h-30 md:h-40"
          />
        </div>
        <div className="-bottom-15 left-20 hidden sm:absolute">
          <DotGridPattern />
        </div>
        <div className="right-30 -bottom-10 hidden sm:absolute">
          <DotGridPattern />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.5, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
        viewport={{ once: true }}
        className="relative flex h-full w-full items-center overflow-hidden rounded-lg shadow-xl sm:w-1/3"
      >
        <img
          src="/background-phone-image.jpg"
          alt="phone background image "
          className="absolute z-10 h-full w-full object-cover"
        />

        <div className="relative z-50 space-y-6 px-5 py-4">
          <h4 className="text-600leading-[150%] max-w-[10ch] font-bold">
            لوازم جانبی لپتاپ
          </h4>

          <Button size="small" variation="secondary">
            خرید
            <ArrowLeft size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default Banner;
