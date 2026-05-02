const { z } = require("zod");
const productSchema = z
  .object({
    name: z
      .string()
      .nonempty(1, "نام محصول نمیتواند خالی باشد")
      .min(3, "نام محصول حداقل باید ۳ کاراکتر باشد"),

    price: z.coerce
      .number("قیمت باید عدد باشد")
      .min(1, "قیمت باید بیشتر از صفر تومان باشد"),

    priceDiscount: z.coerce
      .number("تخفیف باید عدد باشد")
      .min(0, "تخفیف نمیتواند منفی باشد")
      .optional(),

    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "آیدی دسته بندی معتبر نیست"),

    brand: z.object({
      value: z.string().min(1, "مقدار برند الزامی است"),
      label: z.string().min(1, "نام برند الزامی است"),
    }),

    description: z
      .string()
      .nonempty(1, "توضیحات محصول  الزامی است")
      .min(10, "توضیحات حداقل باید ۱۰ کاراکتر باشد"),

    imageCover: z
      .url("آدرس تصویر باید معتبر باشد")
      .nonempty("عکس کاور محصول الزامی است"),

    images: z
      .array(z.url("آدرس تصویر باید معتبر باشد"))
      .min(1, "حداقل یک عکس انتخاب کنید"),

    colors: z
      .array(
        z.object({
          label: z.string().nonempty(1, "عنوان رنگ الزامی است"),
          value: z.string().nonempty(1, "مقدار رنگ الزامی است"),
          hex: z.string().nonempty(1, "کد رنگی الزامی است"),
        }),
      )
      .min(1, "حداقل یک رنگ انتخاب کنید"),

    features: z
      .array(
        z.object({
          label: z.string().nonempty(1, "عنوان ویژگی الزامی است"),
          value: z.string().nonempty(1, "مقدار ویژگی الزامی است"),
        }),
      )
      .min(1, "حداقل یک ویژگی انتخاب کنید"),
  })
  .refine(
    (data) => {
      if (!data.priceDiscount) return true;
      return data.priceDiscount < data.price;
    },
    { path: ["priceDiscount"], message: "تخفیف باید کمتر از قیمت باشد" },
  );

module.exports = productSchema;
