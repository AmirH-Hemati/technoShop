import {
  Call,
  Category,
  HeartAdd,
  Home3,
  Information,
  Location,
  Messages2,
  Timer1,
} from "iconsax-reactjs";

import { motion } from "motion/react";

import Logo from "./Logo.js";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0.5, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeIn" }}
      viewport={{ once: true }}
      className="relative mb-20 pb-10 md:mb-0"
    >
      <div className="via-primary absolute inset-0 container mx-auto h-1 bg-linear-to-r from-transparent to-transparent" />

      <div className="bg-grey-50 z-10 container mx-auto my-6 grid grid-cols-1 items-start gap-2 py-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-6 md:col-span-1">
          <Logo />
          <div className="flex flex-col gap-3">
            <p className="text-grey-700 text-300 leading-relaxed">
              تکنو لایف جاییه که تکنولوژی و هیجان بازی به هم می‌رسن. ما با هدف
              فراهم کردن تجربه‌ای حرفه‌ای، مطمئن و لذت‌بخش برای گیمرها، فعالیت
              خودمون رو در زمینه فروش لوازم گیمینگ و تجهیزات دیجیتال شروع کردیم
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <img src="/download1.png" alt="license" className="h-14 w-auto" />
            <img src="/download2.png" alt="license" className="h-14 w-auto" />
            <img src="/download3.png" alt="license" className="h-14 w-auto" />
          </div>
        </div>

        <div className="flex h-full flex-col gap-4 p-1">
          <span className="text-grey-900 border-primary/30 text-400 inline-block border-b pb-2 font-bold">
            ساعت های کاری
          </span>
          <div className="text-300 text-grey-700 flex h-full flex-col justify-between gap-4 leading-relaxed font-medium">
            <div className="group-hover:text-primary relative flex items-center justify-between">
              <span>شنبه - یکشنبه</span>
              <span>۹:۰۰ صبح – ۶:۰۰ عصر</span>
            </div>
            <div className="group-hover:text-primary relative flex items-center justify-between">
              <span>دوشنبه</span>
              <span>۹:۰۰ صبح – ۶:۰۰ عصر</span>
            </div>
            <div className="group-hover:text-primary relative flex items-center justify-between">
              <span> سه شنبه</span>
              <span>۱۰:۰۰ صبح – 5:۰۰ عصر</span>
            </div>
            <div className="group-hover:text-primary relative flex items-center justify-between">
              <span>چهار و پنجشنبه</span>
              <span>۹:۰۰ صبح – ۵:۰۰ عصر</span>
            </div>
            <div className="group-hover:text-primary relative flex items-center justify-between">
              <span> جمعه </span>
              <span>بسته</span>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-4 p-1">
          <span className="text-grey-900 border-primary/30 text-400 inline-block border-b pb-2 font-bold">
            دسترسی سریع
          </span>
          <div className="text-grey-700 text-300 flex h-full flex-col justify-between gap-4 leading-relaxed font-medium">
            <div className="group flex cursor-pointer items-center gap-2">
              <Home3 size={24} className="group-hover:text-primary" />
              <span className="group-hover:text-primary relative">
                صفحه اصلی
                <div className="bg-primary absolute right-0 bottom-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" />
              </span>
            </div>
            <div className="group flex cursor-pointer items-center gap-2">
              <Category size={24} className="group-hover:text-primary" />
              <span className="group-hover:text-primary relative">
                دسته بندی
                <div className="bg-primary absolute right-0 bottom-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" />
              </span>
            </div>
            <div className="group flex cursor-pointer items-center gap-2">
              <Call size={24} className="group-hover:text-primary" />
              <span className="group-hover:text-primary relative">
                تماس ما
                <div className="bg-primary absolute right-0 bottom-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" />
              </span>
            </div>
            <div className="group flex cursor-pointer items-center gap-2">
              <Information size={24} className="group-hover:text-primary" />
              <span className="group-hover:text-primary relative">
                درباره ما
                <div className="bg-primary absolute right-0 bottom-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-4 p-1">
          <span className="text-grey-900 border-primary/30 text-400 inline-block border-b pb-2 font-bold">
            پشتیبانی
          </span>
          <div className="text-grey-700 text-300 flex h-full flex-col justify-between gap-4 leading-relaxed font-medium">
            <div className="flex items-center gap-3">
              <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm transition-all duration-300 hover:scale-110">
                <Location size={24} />
              </span>
              <span>ایران،تهران ، میدون ونک</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm transition-all duration-300 hover:scale-110">
                <Timer1 size={24} />
              </span>
              <span>همه روزه: ۸ صبح تا ۱۱ شب</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm transition-all duration-300 hover:scale-110">
                <Call size={24} />
              </span>
              <span>09123456789</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm transition-all duration-300 hover:scale-110">
                <Messages2 size={24} />
              </span>
              <span>technoshop@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto flex items-center justify-between px-4 pt-4 sm:px-12">
        <div className="via-primary absolute inset-0 h-0.5 bg-linear-to-r from-transparent to-transparent" />
        <div className="flex flex-col">
          <span className="text-grey-900 text-300 font-medium">
            2025تکنولایف
          </span>
          <span className="text-grey-500 text-300">تمامی حقوق محفوظ است</span>
        </div>
        <div className="text-primary text-300 flex items-center gap-1 font-medium">
          <span>ساخته شده با </span>
          <HeartAdd />
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
