import { Star1 } from "iconsax-reactjs";
import { motion } from "motion/react";
function CustomerReviews() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0.5 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="grid grid-cols-1 gap-5 md:grid-cols-3"
    >
      <div className="relative overflow-hidden rounded-xl bg-white px-6 py-12 shadow hover:scale-105 hover:shadow-2xl">
        <div className="bg-primary/40 absolute -top-5 right-0 h-24 w-24 rounded-full" />
        <div className="bg-primary/40 absolute -bottom-6 left-0 h-24 w-24 rounded-full" />

        <div className="relative z-50 mt-6 space-y-4">
          <div className="flex items-center gap-0.5">
            {[
              ...Array.from({ length: 5 }).map((_, index) => (
                <Star1 variant="Bold" key={index} className="text-yellow-500" />
              )),
            ]}
          </div>
          <p className="text-grey-800 text-justify">
            "تکنو شاپ واقعاً خرید آنلاین رو برام راحت کرده. تنوع محصولات بالاست،
            قیمت‌ها منصفانه‌ست و ارسال هم خیلی سریع انجام شد."
          </p>

          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full font-bold text-white">
              ا
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">امیر حسین همتی</span>
              <span className="text-primary text-xs">بلاگر تکنولوژی</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-white px-6 py-12 shadow hover:scale-105 hover:shadow-2xl">
        <div className="bg-primary/40 absolute -top-5 right-0 h-24 w-24 rounded-full" />
        <div className="bg-primary/40 absolute -bottom-6 left-0 h-24 w-24 rounded-full" />

        <div className="relative z-50 mt-6 space-y-4">
          <div className="flex items-center gap-0.5">
            {[
              ...Array.from({ length: 5 }).map((_, index) => (
                <Star1 variant="Bold" key={index} className="text-yellow-500" />
              )),
            ]}
          </div>
          <p className="text-grey-800 text-justify">
            "تجربه خرید از تکنو شاپ کاملاً رضایت‌بخش بود. پشتیبانی سریع پاسخ داد
            و کیفیت محصول دقیقاً همونی بود که تو سایت نوشته شده بود."
          </p>

          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full font-bold text-white">
              ا
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">امیر حسین همتی</span>
              <span className="text-primary text-xs">بلاگر تکنولوژی</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-white px-6 py-12 shadow hover:scale-105 hover:shadow-2xl">
        <div className="bg-primary/40 absolute -top-5 right-0 h-24 w-24 rounded-full" />
        <div className="bg-primary/40 absolute -bottom-6 left-0 h-24 w-24 rounded-full" />

        <div className="relative z-50 mt-6 space-y-4">
          <div className="flex items-center gap-0.5">
            {[
              ...Array.from({ length: 5 }).map((_, index) => (
                <Star1 variant="Bold" key={index} className="text-yellow-500" />
              )),
            ]}
          </div>
          <p className="text-grey-800 text-justify">
            "چیزی که تکنو شاپ رو متمایز می‌کنه اعتماد و شفافیتشه. از پرداخت امن
            گرفته تا بسته‌بندی تمیز و تحویل به‌موقع، همه‌چی عالی بود."
          </p>

          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full font-bold text-white">
              ا
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">علی علیپور</span>
              <span className="text-primary text-xs">مشتری وفادار</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomerReviews;
