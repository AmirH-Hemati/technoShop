import { z } from "zod";

export const addressSchema = z.object({
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, "آیدی کاربر معتبر نیست"),

  province: z
    .string()
    .nonempty("استان الزامی است")
    .min(2, "نام استان باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام استان باید حداکثر ۵۰ کاراکتر باشد")
    .trim(),

  city: z
    .string()
    .nonempty("شهر الزامی است")
    .min(2, "نام شهر باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام شهر باید حداکثر ۵۰ کاراکتر باشد")
    .trim(),

  postalCode: z
    .string()
    .nonempty("کد پستی الزامی است")
    .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .trim(),

  plate: z.string().nonempty("پلاک الزامی است").trim(),

  unit: z.string().nonempty("واحد الزامی است").trim(),

  fullAddress: z
    .string()
    .nonempty("آدرس کامل الزامی است")
    .min(10, "آدرس کامل باید حداقل ۱۰ کاراکتر باشد")
    .max(500, "آدرس کامل باید حداکثر ۵۰۰ کاراکتر باشد")
    .trim(),

  lat: z
    .number("طول جغرافیایی باید عدد باشد")
    .min(-90, "طول جغرافیایی باید بین -90 تا 90 باشد")
    .max(90, "طول جغرافیایی باید بین -90 تا 90 باشد"),

  lng: z
    .number("عرض جغرافیایی باید عدد باشد")
    .min(-180, "عرض جغرافیایی باید بین -180 تا 180 باشد")
    .max(180, "عرض جغرافیایی باید بین -180 تا 180 باشد"),

  recipientName: z
    .string()
    .nonempty("نام تحویل گیرنده الزامی است")
    .min(3, "نام تحویل گیرنده باید حداقل ۳ کاراکتر باشد")
    .trim(),

  recipientPhone: z
    .string()
    .nonempty("شماره تحویل گیرنده الزامی است")
    .regex(/^(09)[0-9]{9}$/, "شماره موبایل معتبر نیست")
    .trim(),
});

export default addressSchema;