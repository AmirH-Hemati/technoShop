const sharp = require("sharp");
const multer = require("multer");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفا فقط عکس اپلود کنید .", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImage = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.convertStringToParse = (req, res, next) => {
  if (typeof req.body.images === "string") {
    req.body.images = JSON.parse(req.body.images);
  }

  req.body.brand = JSON.parse(req.body.brand);
  req.body.colors = JSON.parse(req.body.colors);
  req.body.features = JSON.parse(req.body.features);
  next();
};

exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.files || !req?.files?.imageCover || !req?.files?.images)
    return next();

  const fileName = `product-${Date.now()}-cover.png`;
  req.body.imageCover = `${req.protocol}://${req.get("host")}/img/products/${fileName}`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(800, 800)
    .toFormat("png")
    .png({ quality: 90 })
    .toFile(`public/img/products/${fileName}`);

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, index) => {
      const fileName = `product-${Date.now()}-${index + 1}.png`;
      await sharp(file.buffer)
        .resize(800, 800)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(`public/img/products/${fileName}`);
      req.body.images.push(
        `${req.protocol}://${req.get("host")}/img/products/${fileName}`,
      );
    }),
  );
  next();
});

exports.findCategoryIdByValue = catchAsync(async (req, res, next) => {
  const { category } = req.query;
  if (!category) return next();

  const categoryDoc = await Category.findOne({ value: category });

  if (!categoryDoc) {
    return next(new AppError("دسته بندی یافت نشد", 404));
  }

  req.queryFilter = { ...req.query, category: categoryDoc._id };
  next();
});

exports.getProductByIds = catchAsync(async (req, res, next) => {
  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });
  res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.getProducts = getAll(Product);

exports.getProductWithSlug = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug });
  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.getProducts = getAll(Product);
exports.getProduct = getOne(Product);
exports.createProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
