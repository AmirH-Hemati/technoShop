const sharp = require("sharp");
const multer = require("multer");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const streamifier = require("streamifier");

const cloudinary = require("../utils/cloudinary");
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
exports.uploadProductImage = upload.single("imageCover");

exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.imageCover = `product-${Date.now()}-cover.png`;

  const imageBuffer = await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("png")
    .png({ quality: 90 })
    .toBuffer();

  const uploadFromBuffer = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
          format: "png",
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );

      streamifier.createReadStream(imageBuffer).pipe(stream);
    });

  const result = await uploadFromBuffer();
  req.body.imageCover = result.secure_url;
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
