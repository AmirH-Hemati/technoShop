import { Request, Response, NextFunction } from "express";
import Address from "../models/addressModel";
import catchAsync from "../utils/catchAsync";
import { createOne, updateOne, deleteOne } from "./handlerFactory";

export const setAddressUserId = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.body.user) req.body.user = req.user?._id;
  next();
};

export const getMyAddresses = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const addresses = await Address.find({ user: req.user?._id });

    res.status(200).json({
      status: "success",
      data: addresses,
    });
  }
);

export const createAddress = createOne(Address);
export const updateAddress = updateOne(Address);
export const deleteAddress = deleteOne(Address);