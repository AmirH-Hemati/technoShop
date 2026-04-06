const multer = require("multer");
const sharp = require("sharp");

const Category = require("../models/categoryModel");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

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
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCategoryImage = upload.single("image");

exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const fileName = `category-${Date.now()}.png`;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("png")
    .png({ quality: 90 })
    .toFile(`public/img/categories/${fileName}`);

  req.body.image = `${req.protocol}://${req.get("host")}/img/categories/${fileName}`;
  next();
});

exports.getCategories = getAll(Category);
exports.getCategory = getOne(Category);
exports.createCategory = createOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
