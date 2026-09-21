import { z } from "zod";

export const createCommentSchema = z.object({
  comment: z
    .string()
    .nonempty("نظر نمی‌تواند خالی باشد")
    .min(3, "نظر باید حداقل ۳ کاراکتر باشد")
    .max(500, "نظر باید حداکثر ۵۰۰ کاراکتر باشد")
    .trim(),

  user: z
    .string()
    .nonempty("آیدی کاربر الزامی است")
    .regex(/^[0-9a-fA-F]{24}$/, "آیدی کاربر معتبر نیست"),

  product: z
    .string()
    .nonempty("آیدی محصول الزامی است")
    .regex(/^[0-9a-fA-F]{24}$/, "آیدی محصول معتبر نیست"),
});

export default createCommentSchema;