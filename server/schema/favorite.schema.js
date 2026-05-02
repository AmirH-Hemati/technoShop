const { z } = require("zod");

const createFavoriteSchema = z.object({
  product: z
    .string()
    .nonempty("آیدی محصول الزامی است")
    .regex(/^[0-9a-fA-F]{24}$/, "آیدی محصول معتبر نیست"),
  user: z
    .string()
    .nonempty("آیدی کاربر الزامی است")
    .regex(/^[0-9a-fA-F]{24}$/, "آیدی کاربر معتبر نیست"),
});

module.exports = createFavoriteSchema;
