import fs from "fs";
import path from "path";
import multer from "multer";
import sharp from "sharp";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from "express";

const memoryStorage = multer.memoryStorage();

const multerFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
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

export const uploadFroalaImage = upload.single("file");

export const resizeFroalaImage = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
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
  }
);

export const deleteFroalaImage = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
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
  }
);