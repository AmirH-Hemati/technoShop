import { z } from "zod";

export const createReviewSchema = z.object({
  review: z
    .string()
    .nonempty("نظر نمیتواند خالی باشد")
    .min(5, "نظر باید حداقل شامل 5 کاراکتر باشد")
    .max(500, "نظر باید حداکثر شامل 500 کاراکتر باشد"),
  rating: z
    .number()
    .min(1, "امتیاز شما نمیتواند کمتر از 1 باشد")
    .max(5, "امتیاز شما نمیتواند بیشتر از 5 باشد")
    .optional(),
  user: z
    .string()
    .nonempty("آیدی کاربر الزامی است")
    .regex(/^[0-9a-fA-F]{24}$/, "آیدی کاربر معتبر نیست"),
  product: z
    .string()
    .nonempty("آیدی محصول الزامی است")
    .regex(/^[0-9a-fA-F]{24}$/, "آیدی محصول معتبر نیست"),
});

export default createReviewSchema;