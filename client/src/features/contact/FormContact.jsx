import { Call, Message, Message2, Send, Send2, User } from "iconsax-reactjs";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { motion } from "motion/react";

function FormContact() {
  return (
    <motion.form
      initial={{ opacity: 0.5, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeIn", duration: 0.4 }}
      viewport={{ once: true }}
      className="shadow-primary/40 bg-grey-0 shadow-2 flex flex-col gap-6 rounded-xl py-6 px-2 md:px-2 md:py-10"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0">
        <FormRow label={"نام و نام خانوادگی"} icon={<User />}>
          <Input type="text" placeholder="علی اصفر واثقی" />
        </FormRow>
        <FormRow label="ایمیل" icon={<Message2 />}>
          <Input type="text" placeholder="example@gmail.com" />
        </FormRow>
      </div>

      <FormRow label="شماره تلفن" icon={<Call />}>
        <Input type="number" placeholder="09123456789" />
      </FormRow>

      <FormRow label="پیام شما" icon={<Message />}>
        <Textarea placeholder="پیام خود را اینجا بنویسید ..." rows={4} />
      </FormRow>

      <button className="from-primary text-grey-0 flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r to-[#9B4DFF] px-5 py-3">
        <Send2 />
        ارسال پیام
      </button>
    </motion.form>
  );
}

export default FormContact;
