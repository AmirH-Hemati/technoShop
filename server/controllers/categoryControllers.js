const multer = require("multer");
const sharp = require("sharp");

const Category = require("../models/categoryModel");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

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
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCategoryImage = upload.single("image");

exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const imageBuffer = await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("png")
    .png({ quality: 90 })
    .toBuffer();

  const uploadFromBuffer = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "categories",
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
  req.body.image = result.secure_url;
  next();
});

exports.getCategories = getAll(Category);
exports.getCategory = getOne(Category);
exports.createCategory = createOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);


