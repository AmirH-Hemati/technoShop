const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { getOne, getAll, updateOne, deleteOne } = require("./handlerFactory");

const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");

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

  const imageBuffer = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  const uploadFromBuffer = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "users",
          format: "jpeg",
          public_id: `user-${req.user.id}-${Date.now()}`,
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );

      streamifier.createReadStream(imageBuffer).pipe(stream);
    });

  const result = await uploadFromBuffer();

  req.body.photo = result.secure_url;
  req.body.photoPublicId = result.public_id;

  next();
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;

  const updateUser = { name, email };
  if (req.body.photo) {
    const user = await User.findById(req.user.id);

    if (user.photoPublicId) {
      await cloudinary.uploader.destroy(user.photoPublicId);
    }

    updateUser.photo = req.body.photo;
    updateUser.photoPublicId = req.body.photoPublicId;
  }

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
