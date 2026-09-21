import multer from "multer";
import sharp from "sharp";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import { getOne, getAll, updateOne, deleteOne } from "./handlerFactory";
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
    cb(new Error("لطفا فقط عکس اپلود کنید ."), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserImage = upload.single("photo");

export const resizeUserImage = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const fileName = `user-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${fileName}`);

    req.body.photo = `${req.protocol}://${req.get("host")}/img/users/${fileName}`;

    next();
  }
);

export const getMe = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  req.params.id = req.user?._id?.toString() || "";
  next();
};

export const updateMe = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { name, email, nationalId } = req.body;

    const updateUser = { name, email, nationalId };
    if (req.body.photo && req.file) updateUser.photo = req.body.photo;

    const updatedUser = await User.findByIdAndUpdate(req.user?._id, updateUser, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
);

export const getUser = getOne(User);
export const getUsers = getAll(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);