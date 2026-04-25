import { Briefcase, Like1, People, ShoppingBag } from "iconsax-reactjs";

import { motion } from "motion/react";

const stats = [
  {
    icon: Briefcase,
    value: "+4",
    label: "سال تجربه",
  },
  {
    icon: People,
    value: "+1200",
    label: "مشتری راضی",
  },
  {
    icon: ShoppingBag,
    value: "+3500",
    label: "سفارش موفق",
  },
  {
    icon: Like1,
    value: "100%",
    label: "رضایت کاربران",
  },
];

function Stats() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0.5 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="hover:bg-primary/5 group flex flex-col items-center justify-center gap-4 rounded-4xl bg-white p-12 text-center shadow-[0_10px_40px_-10px_rgba(94,10,142,0.35)] transition-all duration-300 hover:scale-105"
          >
            <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-12">
              <Icon size="28" variant="Bold" className="text-grey-0" />
            </div>

            <span className="text-grey-900 text-2xl font-extrabold">
              {item.value}
            </span>

            <span className="text-grey-600 text-sm font-medium">
              {item.label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

export default Stats;
