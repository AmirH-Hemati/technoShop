const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const validatePhone = (phoneNumber) => {
  const regex = new RegExp("^09\\d{9}$");
  return regex.test(phoneNumber);
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
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
    data: { phone: phoneNumber },
    code: verificationCode,
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

  const token = signToken(user._id);

  const cookieOption = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    sameSite: "lax",
    secure: false,
  };
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;
  if (process.env.NODE_ENV === "production") cookieOption.sameSite = "none";
  res.cookie("jwt", token, cookieOption);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.logout = (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};
exports.protected = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        "شما لاگین نکرده اید . برای دسترسی وارد حساب کاربری شوید",
        400
      )
    );
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(new AppError("حساب کاربری مطابق با توکن پیدا نشد", 401));
  }

  req.user = currentUser;
  next();
});
