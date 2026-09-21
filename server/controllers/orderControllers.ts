import Order from "../models/orderModel";
import catchAsync from "../utils/catchAsync";
import { getAll, getOne } from "./handlerFactory";
import { Request, Response, NextFunction } from "express";

export const getMyOrders = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { status } = req.query;
    const filter: Record<string, unknown> = { user: req.user?._id };
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter);
    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
);

export const getRecentOrder = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const orders = await Order.find({ user: req.params.userId });
    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
);

export const getOrders = getAll(Order);
export const getOrder = getOne(Order);