import Favorite from "../models/favoriteModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { deleteOne, getOne } from "./handlerFactory";
import { Request, Response, NextFunction } from "express";

export const myFavoriets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const favoriets = await Favorite.find({ user: req.user?._id });

    if (!favoriets) {
      return next(new AppError("محصول مورد علاقه ای پیدا نشد", 404));
    }
    res.status(200).json({
      status: "success",
      data: favoriets,
    });
  }
);

export const setFavorietUserId = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.body.user) req.body.user = req.user?._id;
  next();
};

export const toggleFavoriet = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { productId } = req.body;
    const userId = req.user?._id;

    const existingFavoriet = await Favorite.findOne({
      user: userId,
      product: productId,
    });

    if (existingFavoriet) {
      await Favorite.findByIdAndDelete(existingFavoriet._id);

      return res.status(200).json({
        status: "success",
        message: "محصول با موفقیت از لیست علاقه مندی ها حذف شد",
        data: null,
      });
    }
    const favorietProduct = await Favorite.create({
      user: userId,
      product: productId,
    });
    return res.status(201).json({
      status: "success",
      message: "محصول با موفقیت به لیست علاقه مندی ها اضافه شد",
      data: favorietProduct,
    });
  }
);

export const getFavoriet = getOne(Favorite);
export const deleteFavoriet = deleteOne(Favorite);