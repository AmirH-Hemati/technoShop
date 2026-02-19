import { ArrowLeft, ArrowLeft2, Shop } from "iconsax-reactjs";
import CustomerReviews from "../../features/aboutUs/CustomerReviews";
import OrderNow from "../../features/aboutUs/OrderNow";
import Stats from "../../features/aboutUs/Stats";
import Timeline from "../../features/aboutUs/Timeline";
import { motion } from "motion/react";
function AboutUs() {
  return (
    <section className="relative mt-6 flex flex-col gap-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <motion.h1
          initial={{ y: 80, opacity: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="from-primary bg-gradient-to-r to-[#9B4DFF] bg-clip-text text-4xl font-black text-transparent md:text-6xl lg:text-7xl"
        >
          تــکنــــــوشاپ
        </motion.h1>

        <motion.p
          initial={{ y: 80, opacity: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-grey-700 text-base leading-8 md:text-lg"
        >
          فروش تخصصی تجهیزات گیمینگ و لوازم جانبی تکنولوژی با
          <span className="text-grey-900 font-semibold"> تضمین اصالت کالا</span>
          ، پرداخت امن و ارسال سریع
        </motion.p>
      </div>

      <motion.button
        initial={{ y: 80, opacity: 0.5 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="bg-primary flex cursor-pointer items-center gap-2 self-center rounded-full px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        مشاهده محصولات
        <ArrowLeft2 />
      </motion.button>
      <Stats />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <motion.h2
          initial={{ y: 80, opacity: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-3xl font-extrabold lg:text-4xl"
        >
          چرا <span className="text-primary">تکنوشاپ</span> ؟
        </motion.h2>

        <motion.p
          initial={{ y: 80, opacity: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-grey-700 max-w-2xl leading-8"
        >
          ما فقط یک فروشگاه نیستیم؛ تکنوشاپ جاییه که کیفیت، اعتماد و تجربه خرید
          حرفه‌ای در کنار هم قرار می‌گیرن.
        </motion.p>
      </div>

      <Timeline />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <motion.h2
          initial={{ y: 80, opacity: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-3xl font-extrabold lg:text-4xl"
        >
          نظرات مشتریان
        </motion.h2>

        <motion.p
          initial={{ y: 80, opacity: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-grey-700"
        >
          آنچه مشتریان ما درباره تجربه خرید از تکنوشاپ می‌گویند
        </motion.p>
      </div>

      <CustomerReviews />

      <OrderNow />
    </section>
  );
}

export default AboutUs;
