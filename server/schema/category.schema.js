const { z } = require("zod");
const createCategorySchema = z.object({
  label: z
    .string()
    .nonempty("عنوان دسته بندی الزامی است")
    .min(3, "عنوان دسته بندی باید حداقل ۲ کاراکتر باشد")
    .max(50, "عنوان دسته بندی باید حداکثر ۵۰ کاراکتر باشد")
    .trim(),
  image: z.url("آدرس تصویر باید معتبر باشد").nonempty("تصویر دسته بندی الزامی است"),
});

module.exports = createCategorySchema;
