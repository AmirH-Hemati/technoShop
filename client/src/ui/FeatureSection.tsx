import {
  CallCalling,
  MonitorMobbile,
  ShieldTick,
  TruckFast,
} from "iconsax-reactjs";
import { motion } from "motion/react";

function FeatureSection() {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeIn" }}
      viewport={{ once: true }}
      className="my-12 grid grid-cols-2 gap-4 sm:grid-cols-4  place-items-center sm:gap-0 text-gray-600 leading-[140%] font-medium"
    >
      <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
        <span>
          پشتیبانی 24 ساعته
        </span>
        <CallCalling variant="Bold" size="50" className="text-primary" />
      </div>
      <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
        <span>
          تحویل سریع
        </span>
        <TruckFast variant="Bold" size="50" className="text-primary" />
      </div>
      <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
        <span>
          ضمانت کالا
        </span>
        <ShieldTick variant="Bold" size="50" className="text-primary" />
      </div>
      <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
        <span>
          جدیدترین تکنولوژی
        </span>
        <MonitorMobbile variant="Bold" size="50" className="text-primary" />
      </div>
    </motion.div>
  );
}

export default FeatureSection;
