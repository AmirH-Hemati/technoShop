import { ArrowLeft2 } from "iconsax-reactjs";

import { motion } from "motion/react";

import Button from "./Button";

function Artboards() {
  return (
    <section className="grid grid-cols-1 flex-col gap-2 lg:grid-cols-[1fr_auto]">
      <motion.div
        initial={{ opacity: 0.5, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
        viewport={{ once: true }}
        className="relative flex flex-col overflow-hidden rounded-2xl text-white"
      >
        <img
          src="Artboard1.png"
          alt=""
          className="h-full w-full object-cover object-right"
        />

        <div className="absolute top-70 right-16">
          <Button variation="secondary" size="small">
            همین الان بساز
            <ArrowLeft2 size="16" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.5, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.4 }}
        viewport={{ once: true }}
        className="grid w-full grid-cols-2 gap-2 lg:grid-cols-1"
      >
        <div className="relative overflow-hidden rounded-lg text-white">
          <img
            src="Artboard2.png"
            alt=""
            className="h-full w-full object-cover object-left"
          />

          <div className="absolute inset-0 flex flex-col justify-center gap-1 px-2">
            <h3 className="text-200 max-w-[10ch] leading-[140%] font-extrabold sm:max-w-[20ch]">
              عین آب خوردن
            </h3>
            <h3 className="text-200 max-w-[13ch] leading-[180%] font-medium sm:max-w-[20ch]">
              کامپیوترت رو بساز
            </h3>
            <p className="text-200 max-w-[13ch] leading-[140%] font-medium text-[#77A9FF] sm:max-w-[20ch]">
              تجهیزات کامل کاستوم تکنوشاپ
            </p>
            <div className="mt-4 hidden md:block">
              <Button variation="secondary" size="small">
                همین الان بساز
                <ArrowLeft2 size="16" />
              </Button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg text-white">
          <img
            src="Artboard3.png"
            alt=""
            className="w-full object-cover object-left sm:h-full"
          />
          <div className="absolute inset-0 flex h-full flex-col justify-center gap-1 px-2 sm:gap-0">
            <h3 className="text-200 max-w-[10ch] leading-[140%] font-extrabold sm:max-w-[20ch]">
              اینستاگراممون رو از دست نده
            </h3>
            <p className="text-200 max-w-[15ch] leading-[140%] font-medium text-[#77A9FF] sm:max-w-[20ch]">
              جدیدترین محصولات و تحفیف های ویژه
            </p>
            <div className="mt-5 hidden md:block">
              <Button variation="secondary" size="small">
                فالو کن جا نمونی
                <ArrowLeft2 size="16" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Artboards;
