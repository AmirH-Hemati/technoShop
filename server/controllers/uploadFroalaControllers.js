const fs = require("fs");
const path = require("path");

const multer = require("multer");
const sharp = require("sharp");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const memoryStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفا فقط عکس اپلود بکنید", 400), false);
  }
};
const upload = multer({
  storage: memoryStorage,
  fileFilter: multerFilter,
});
exports.uploadFroalaImage = upload.single("file");
exports.resizeFroalaImage = catchAsync(async (req, res, next) => {
  if (!req.file)
    return res.status(400).json({ message: "هیچ تصویری ارسال نشده است" });

  const filename = `froala-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .resize(1500)
    .toFormat("png")
    .png({ quality: 90 })
    .toFile(`public/img/froala/${filename}`);

  const fileUrl = `${req.protocol}://${req.get("host")}/img/froala/${filename}`;

  return res.status(200).json({
    link: fileUrl,
  });
});

exports.deleteFroalaImage = catchAsync(async (req, res, next) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "آدرس تصویر الزامی است" });

  const fileName = path.basename(url);
  const filePath = path.join(`public/img/froala`, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.status(204).json({ message: "تصویر حذف شد" });
  } else {
    return res.status(404).json({ message: "فایل یافت نشد" });
  }
});
