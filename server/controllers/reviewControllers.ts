import Review from "../models/reviewModel";
import {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} from "./handlerFactory";
import { Request, Response, NextFunction } from "express";

export const setProductUserId = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.body.user) req.body.user = req.user?._id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};

export const getReviews = getAll(Review);
export const getReview = getOne(Review);
export const createReview = createOne(Review);
export const updateReview = updateOne(Review);
export const deleteReview = deleteOne(Review);