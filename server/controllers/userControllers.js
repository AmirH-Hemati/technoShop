const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { getOne, getAll, updateOne, deleteOne } = require("./handlerFactory");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفا فقط عکس اپلود کنید .", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserImage = upload.single("photo");

exports.resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const fileName = `user-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${fileName}`);

  req.body.photo = `${req.protocol}://${req.get("host")}/img/users/${fileName}`;

  next();
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const { name, email, nationalId } = req.body;

  const updateUser = { name, email, nationalId };
  if (req.body.photo && req.file) updateUser.photo = req.body.photo;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updateUser, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.getUser = getOne(User);
exports.getUsers = getAll(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
