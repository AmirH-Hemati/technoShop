import multer from "multer";
import sharp from "sharp";
import Category from "../models/categoryModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} from "./handlerFactory";

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفا فقط عکس اپلود کنید .", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadCategoryImage = upload.single("image");

export const resizeCategoryImage = catchAsync(
  async (req: Express.Request, _res: Express.Response, next: Express.NextFunction) => {
    if (!req.file) return next();

    const fileName = `category-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(1024, 1024)
      .toFormat("png")
      .png({ quality: 90 })
      .toFile(`public/img/categories/${fileName}`);

    req.body.image = `${req.protocol}://${req.get("host")}/img/categories/${fileName}`;
    next();
  }
);

export const getCategories = getAll(Category);
export const getCategory = getOne(Category);
export const createCategory = createOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);