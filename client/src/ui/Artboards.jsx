import { ArrowLeft2 } from "iconsax-reactjs";
import Button from "./Button";
import { motion } from "motion/react";
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

        <div className="absolute top-70 right-12">
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

          <div className="text-300 absolute inset-0 flex flex-col justify-center px-2">
            <p className="leading-[180%] font-normal">عین آب خوردن</p>
            <h3 className="leading-[180%] font-extrabold">کامپیوترت رو بساز</h3>
            <p className="text-100 max-w-[20ch] leading-[140%] font-medium text-[#77A9FF]">
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
            className="h-full w-full object-cover object-left"
          />
          <div className="absolute inset-0 flex h-full flex-col justify-center px-2">
            <h3 className="text-300 max-w-[20ch] leading-[140%] font-extrabold">
              اینستاگراممون رو از دست نده
            </h3>
            <p className="text-100 max-w-[20ch] leading-[140%] font-medium text-[#77A9FF]">
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
