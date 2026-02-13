const Favoriet = require("../models/favoriteModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { deleteOne, getOne } = require("./handlerFactory");

exports.myFavoriets = catchAsync(async (req, res, next) => {
  const favoriets = await Favoriet.find({ user: req.user._id });

  if (!favoriets) {
    return next(new AppError("محصول مورد علاقه ای پیدا نشد", 404));
  }
  res.status(200).json({
    status: "success",
    data: favoriets,
  });
});

exports.setFavorietUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.toggleFavoriet = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.id;

  const existingFavoriet = await Favoriet.findOne({
    user: userId,
    product: productId,
  });

  if (existingFavoriet) {
    await Favoriet.findByIdAndDelete(existingFavoriet._id);

    return res.status(200).json({
      status: "success",
      message: "محصول با موفقیت از لیست علاقه مندی ها حذف شد",
      data: null,
    });
  }
  const favorietProduct = await Favoriet.create({
    user: userId,
    product: productId,
  });
  return res.status(201).json({
    status: "success",
    message: "محصول با موفقیت به لیست علاقه مندی ها اضافه شد",
    data: favorietProduct,
  });
});

exports.getFavoriet = getOne(Favoriet);
exports.deleteFavoriet = deleteOne(Favoriet);
