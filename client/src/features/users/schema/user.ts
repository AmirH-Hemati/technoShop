import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .nonempty("نام نمی تواند خالی باشد")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد"),
  email: z.email("ایمیل معتبر نیست"),
  nationalId: z.coerce
    .number("کد ملی نمیتواند شامل حروف باشد")
    .min(10, "کد ملی نمیتواند کمتر از  ۱۰ رقم باشد"),
  photo: z.any().optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
