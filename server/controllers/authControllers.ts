import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import {
  signToken,
  refreshTokenOptions,
  accessTokenOptions,
  verifyToken,
} from "../utils/jwt";
import { setAuthCookies, clearAuthCookies } from "../utils/cookies";
import { thirtyDaysFromNow } from "../utils/date";

const validatePhone = (phoneNumber: string): boolean => {
  const regex = new RegExp("^09\\d{9}$");
  return regex.test(phoneNumber);
};

export const handelSendCode = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) return next(new AppError("شماره موبایل الزامی است", 400));

    const validPhoneNumber = validatePhone(phoneNumber);

    if (!validPhoneNumber) {
      return next(new AppError("شماره موبایل نامعتبر است", 400));
    }

    let user = await User.findOne({ phone: phoneNumber });
    if (!user) {
      user = await User.create({ phone: phoneNumber });
    }

    const verificationCode = user.createVerificationCode();
    await user.save();

    res.status(200).json({
      message: ` کد تایید به شماره موبایل ارسال گردید. `,
      data: { phone: phoneNumber, code: verificationCode },
    });
  }
);

export const handelSmsAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, verificationCode } = req.body;

    if (!phoneNumber || !verificationCode) {
      return next(new AppError("شماره موبایل یا کد الزامی است", 400));
    }

    const validPhoneNumber = validatePhone(phoneNumber);

    if (!validPhoneNumber) {
      return next(new AppError("شماره موبایل نامعتبر است", 400));
    }
    const user = await User.findOne({ phone: phoneNumber });

    if (!user) return next(new AppError("کاربری یافت نشد", 404));

    if (user.verificationCode !== verificationCode)
      return next(new AppError("کد تایید اشتباه است", 400));

    if (!user.verificationCodeExpires)
      return next(new AppError("کد تایید یافت نشد یا منقضی شده است", 400));

    const isExpired = user.verificationCodeExpires < new Date();

    if (isExpired) {
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();
      return next(new AppError("کد تایید منقضی شده است", 401));
    }
    const userId = { user: user._id };
    const refreshToken = signToken(userId, refreshTokenOptions);
    const accessToken = signToken(userId, accessTokenOptions);

    user.refreshToken = refreshToken;
    user.refreshTokenExpires = thirtyDaysFromNow();

    await user.save();
    return setAuthCookies({ res, accessToken, refreshToken }).status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export const handleRefresh = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      clearAuthCookies(res);
      throw new AppError(
        "توکن معتبر سازی وجود ندارد",
        401,
        "REFRESH_TOKEN_MISSING"
      );
    }

    let payload;
    try {
      payload = verifyToken(refreshToken, refreshTokenOptions);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        clearAuthCookies(res);
        throw new AppError(
          "توکن معتبر سازی شما منقضی شده است",
          401,
          "REFRESH_TOKEN_EXPIRED"
        );
      }

      if (err instanceof jwt.JsonWebTokenError) {
        clearAuthCookies(res);
        throw new AppError(
          "توکن معتبر سازی شما نامعتبر است",
          401,
          "INVALID_REFRESH_TOKEN"
        );
      }

      throw err;
    }

    const user = await User.findOne({
      _id: payload.user,
      refreshToken,
      refreshTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      clearAuthCookies(res);
      throw new AppError(
        "حساب کاربری مطابق با توکن پیدا نشد",
        401,
        "INVALID_REFRESH_TOKEN"
      );
    }
    const userId = { user: user._id };
    const newRefreshToken = signToken(userId, refreshTokenOptions);
    const newAccessToken = signToken(userId, accessTokenOptions);

    user.refreshToken = newRefreshToken;
    user.refreshTokenExpires = thirtyDaysFromNow();
    await user.save();

    return setAuthCookies({
      res,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    })
      .status(200)
      .json({
        status: "success",
      });
  }
);

export const logout = (_req: Request, res: Response) => {
  return clearAuthCookies(res)
    .status(200)
    .json({ status: "success", message: "با موفقیت خارج شدید" });
};

export const protect = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(
        new AppError(
          "شما لاگین نکرده اید . برای دسترسی وارد حساب کاربری شوید",
          401,
          "ACCESS_TOKEN_MISSING"
        )
      );
    }

    let payload;
    try {
      payload = verifyToken(token, accessTokenOptions);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new AppError(
          "توکن دسترسی شما منقضی شده است",
          401,
          "ACCESS_TOKEN_EXPIRED"
        );
      }

      if (err instanceof jwt.JsonWebTokenError) {
        throw new AppError(
          "توکن دسترسی شما نامعتبر است",
          401,
          "INVALID_ACCESS_TOKEN"
        );
      }

      throw err;
    }

    const currentUser = await User.findById(payload.user);
    if (!currentUser) {
      return next(
        new AppError("حساب کاربری مطابق با توکن پیدا نشد", 401, "USER_NOT_FOUND")
      );
    }

    req.user = currentUser;
    next();
  }
);