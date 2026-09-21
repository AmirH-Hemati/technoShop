import Comment from "../models/CommentModel";
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

export const getComments = getAll(Comment);
export const getComment = getOne(Comment);
export const createComment = createOne(Comment);
export const updateComment = updateOne(Comment);
export const deleteComment = deleteOne(Comment);