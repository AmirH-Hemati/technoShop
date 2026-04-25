import { Call, Location, Message, Timer1 } from "iconsax-reactjs";
import { motion } from "motion/react";
function InformationContact() {
  return (
    <motion.div
      initial={{ opacity: 0.5, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeIn", duration: 0.4 }}
      viewport={{ once: true }}
      className="relative flex bg-grey-0 shadow-2 flex-col justify-between gap-8 rounded-xl px-6 py-10 shadow"
    >
      <div className="flex items-center gap-2 transition duration-300 hover:translate-x-1">
        <div className="bg-primary/30 rounded-full p-2">
          <Message size={22} className="text-primary" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold">پیام بفرستید</h3>
          <p className="text-grey-700 text-xs">
            از طریق فرم مقابل با ما در ارتباط باشید
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 transition duration-300 hover:translate-x-1">
        <div className="bg-primary/30 rounded-full p-2">
          <Call size={22} className="text-yellow-800" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold">تلفن تماس</h3>
          <p className="text-grey-700 text-xs">09123456789</p>
        </div>
      </div>
      <div className="flex items-center gap-2 transition duration-300 hover:translate-x-1">
        <div className="bg-primary/30 rounded-full p-2">
          <Message size={22} className="text-primary" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold">ایمیل</h3>
          <p className="text-grey-700 text-xs">tecknoShop@cafino.com </p>
        </div>
      </div>
      <div className="flex items-center gap-2 transition duration-300 hover:translate-x-1">
        <div className="bg-primary/30 rounded-full p-2">
          <Location size={22} className="text-red-600" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold">آدرس</h3>
          <p className="text-grey-700 text-xs">
            اصفهان، خیابان گلزار ، کوچه 16
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 transition duration-300 hover:translate-x-1">
        <div className="bg-primary/30 rounded-full p-2">
          <Timer1 size={22} className="text-primary" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold">ساعات کاری</h3>
          <p className="text-grey-700 text-xs">
            همه‌روزه از ساعت ۸ صبح تا ۱۱ شب
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="via-primary absolute inset-0 bottom-0 container mx-auto h-0.5 bg-linear-to-r from-transparent to-transparent" />
        <p className="text-grey-900 mt-4 text-center">
          مشتاقانه منتظر شنیدن نظرات ارزشمند شما عزیزان هستیم
        </p>
      </div>
    </motion.div>
  );
}

export default InformationContact;
