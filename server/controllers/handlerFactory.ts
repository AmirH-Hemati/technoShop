import ApiFeatures from "../utils/ApiFeatures";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { Model, Document, FilterQuery } from "mongoose";
import { Request, Response, NextFunction } from "express";

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export const deleteOne = <T extends Document>(
  Model: Model<T>,
): ControllerFunction =>
  catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      console.log("delete product", req.params.id);
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        throw new AppError("No document found with that ID", 404);
      }

      res.status(204).json({
        status: "success",
        data: null,
      });
    },
  );

export const updateOne = <T extends Document>(
  Model: Model<T>,
): ControllerFunction =>
  catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        throw new AppError("No document found with that ID", 404);
      }

      res.status(200).json({
        status: "success",
        data: doc,
      });
    },
  );

export const createOne = <T extends Document>(
  Model: Model<T>,
): ControllerFunction =>
  catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const doc = await Model.create(req.body);

      res.status(201).json({
        status: "success",
        data: doc,
      });
    },
  );

export const getOne = <T extends Document>(
  Model: Model<T>,
): ControllerFunction =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const doc = await Model.findById(req.params.id);

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: doc,
      });
    },
  );

export const getAll = <T extends Document>(
  Model: Model<T>,
): ControllerFunction =>
  catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const filter: FilterQuery<T> = {};
      if (req.params.productId) {
        (filter as Record<string, unknown>).product = req.params.productId;
      }
      const features = new ApiFeatures(Model.find(filter), req)
        .filter()
        .search()
        .sort()
        .limitFields()
        .paginate();
      const doc = await features.query;

      res.status(200).json({
        status: "success",
        results: doc.length,
        data: doc,
      });
    },
  );
