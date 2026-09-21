import sharp from "sharp";
import multer from "multer";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} from "./handlerFactory";
import { Request, Response, NextFunction } from "express";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفا فقط عکس اپلود کنید .", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadProductImage = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

export const convertStringToParse = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (
      !req.body.brand ||
      !req.body.colors ||
      !req.body.features ||
      !req.body.images
    )
      return next();

    if (typeof req.body.images === "string") {
      req.body.images = JSON.parse(req.body.images);
    }

    req.body.brand = JSON.parse(req.body.brand);
    req.body.colors = JSON.parse(req.body.colors);
    req.body.features = JSON.parse(req.body.features);
    next();
  }
);

export const resizeProductImage = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (
      !req.files ||
      !("imageCover" in req.files) ||
      !("images" in req.files)
    )
      return next();

    const files = req.files as {
      imageCover: Express.Multer.File[];
      images: Express.Multer.File[];
    };

    const fileName = `product-${Date.now()}-cover.png`;
    req.body.imageCover = `${req.protocol}://${req.get("host")}/img/products/${fileName}`;

    await sharp(files.imageCover[0].buffer)
      .resize(800, 800)
      .toFormat("png")
      .png({ quality: 90 })
      .toFile(`public/img/products/${fileName}`);

    req.body.images = [];

    await Promise.all(
      files.images.map(async (file, index) => {
        const fileName = `product-${Date.now()}-${index + 1}.png`;
        await sharp(file.buffer)
          .resize(800, 800)
          .toFormat("png")
          .png({ quality: 90 })
          .toFile(`public/img/products/${fileName}`);
        req.body.images.push(
          `${req.protocol}://${req.get("host")}/img/products/${fileName}`
        );
      })
    );
    next();
  }
);

export const findCategoryIdByValue = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { category } = req.query;
    if (!category) return next();

    const categoryDoc = await Category.findOne({ value: category });

    if (!categoryDoc) {
      return next(new AppError("دسته بندی یافت نشد", 404));
    }

    req.queryFilter = { ...req.query, category: categoryDoc._id };
    next();
  }
);

export const getProductByIds = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
    res.status(200).json({
      status: "success",
      data: products,
    });
  }
);

export const getProducts = getAll(Product);

export const getProductWithSlug = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    res.status(200).json({
      status: "success",
      data: product,
    });
  }
);

export const createProduct = createOne(Product);
export const getProduct = getOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);