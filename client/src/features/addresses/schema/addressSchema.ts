import { z } from "zod";

export const addressSchema = z.object({
  fullAddress: z.string().nonempty("آدرس اجباری است"),
  province: z.string().min(1, "استان را انتخاب کنید"),
  city: z.string().min(1, "شهر را انتخاب کنید"),
  plate: z.string().min(1, "پلاک اجباری است"),
  unit: z.string().min(1, "واحد اجباری است"),
  postalCode: z.string().regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  fullName: z
    .string()
    .nonempty("نام و نام خانوادگی نمیتواند خالی باشد")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد"),
  phone: z.string().regex(/^\d{11}$/, "شماره موبایل باید ۱۱ رقم باشد"),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
