import FormContact from "@/features/contact/components/FormContact.js";
import InformationContact from "@/features/contact/components/InformationContact.js";
import Questions from "@/features/contact/components/Questions.js";

export default function ContactUs() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-black lg:text-4xl">تماس با ما</h1>
        <p className="text-grey-800 text-center md:text-right">
          سوالات، پیشنهادات و انتقادات خود را با ما در میان بگذارید. تیم
          پشتیبانی ما آماده پاسخگویی به شما است.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <FormContact />
        <InformationContact />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-black lg:text-4xl">
          سوالات متداول
        </h1>
        <p className="text-grey-800 text-center md:text-right">
          پاسخ‌های سوالات پرتکرار کاربران
        </p>
      </div>
      <Questions />
    </div>
  );
}
