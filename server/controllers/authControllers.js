const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const {
  signToken,
  refreshTokenOptions,
  accessTokenOptions,
  verifyToken,
} = require("../utils/jwt");
const { setAuthCookies, clearAuthCookies } = require("../utils/cookies");
const { thirtyDaysFromNow } = require("../utils/date");
const validatePhone = (phoneNumber) => {
  const regex = new RegExp("^09\\d{9}$");
  return regex.test(phoneNumber);
};

exports.handelSendCode = catchAsync(async function (req, res, next) {
  const { phoneNumber } = req.body;

  if (!phoneNumber) return next(new AppError(" شماره موبایل الزامی است", 400));

  const validPhoneNumber = validatePhone(phoneNumber);

  if (!validPhoneNumber) {
    return next(new AppError("شماره موبایل نامعتبر است", 400));
  }

  let user = await User.findOne({ phone: phoneNumber });
  if (!user) {
    user = await User.create({ phone: phoneNumber });
  }

  // Generate verification code and store in mongodb
  const verificationCode = user.createVerificationCode();
  await user.save();

  res.status(200).json({
    message: ` کد تایید به شماره موبایل ارسال گردید. `,
    data: { phone: phoneNumber, code: verificationCode },
  });
});

exports.handelSmsAuth = catchAsync(async (req, res, next) => {
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

  const isExpired = user.verificationCodeExpires < Date.now();

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
});

exports.handleRefresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    clearAuthCookies(res);
    throw new AppError(
      "توکن معتبر سازی وجود ندارد",
      401,
      "REFRESH_TOKEN_MISSING",
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
        "REFRESH_TOKEN_EXPIRED",
      );
    }

    if (err instanceof jwt.JsonWebTokenError) {
      clearAuthCookies(res);
      throw new AppError(
        "توکن معتبر سازی شما نامعتبر است",
        401,
        "INVALID_REFRESH_TOKEN",
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
      "INVALID_REFRESH_TOKEN",
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
});

exports.logout = (req, res) => {
  return clearAuthCookies(res)
    .status(200)
    .json({ status: "success", message: "با موفقیت خارج شدید" });
};

exports.protected = catchAsync(async (req, res, next) => {
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
        "ACCESS_TOKEN_MISSING",
      ),
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
        "ACCESS_TOKEN_EXPIRED",
      );
    }

    if (err instanceof jwt.JsonWebTokenError) {
      throw new AppError(
        "توکن دسترسی شما نامعتبر است",
        401,
        "INVALID_ACCESS_TOKEN",
      );
    }

    throw err;
  }

  const currentUser = await User.findById(payload.user);
  if (!currentUser) {
    return next(
      new AppError("حساب کاربری مطابق با توکن پیدا نشد", 401, "USER_NOT_FOUND"),
    );
  }

  req.user = currentUser;
  next();
});
