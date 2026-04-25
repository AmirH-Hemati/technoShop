import { motion } from "motion/react";
import { Star1, Truck, Wallet, Headphones, Cpu } from "iconsax-reactjs";

const timelineData = [
  {
    title: "اصالت کالا",
    description:
      "تمامی محصولات BotCore اورجینال بوده و دارای ضمانت اصالت کالا هستند.",
    icon: Star1,
  },
  {
    title: "ارسال سریع",
    description:
      "سفارش‌ها با بسته‌بندی حرفه‌ای و ارسال سریع به سراسر کشور ارسال می‌شوند.",
    icon: Truck,
  },
  {
    title: "پرداخت امن",
    description:
      "پرداخت‌ها از طریق درگاه‌های امن بانکی انجام می‌شود تا خریدی مطمئن داشته باشید.",
    icon: Wallet,
  },
  {
    title: "پشتیبانی پاسخ‌گو",
    description:
      "تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات و مشکلات شماست.",
    icon: Headphones,
  },
  {
    title: "تجربه خرید حرفه‌ای",
    description:
      "روند سفارش و خرید بهینه و ساده طراحی شده تا تجربه‌ای راحت و سریع داشته باشید.",
    icon: Cpu,
  },
];

const TimelineItem = ({ item, index }) => {
  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      className={`relative mb-8 flex w-full ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
    >
      <div className="bg-primary border-grey-0 absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 md:block">
        <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>

      <div className="relative flex w-full items-center gap-4 rounded-2xl bg-white px-4 py-10 shadow-xl md:w-5/12">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white">
              <item.icon variant="Bold" />
            </div>
            <h3 className="mb-1 text-xl font-bold">{item.title}</h3>
          </div>
          <p className="text-grey-700 mr-12 text-xs font-bold">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <div className="relative w-full px-4 py-12 md:px-0">
      <div className="bg-primary absolute top-0 left-1/2 hidden h-full w-1 -translate-x-1/2 md:block"></div>

      <div className="flex flex-col">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
