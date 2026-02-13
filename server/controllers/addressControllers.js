const Address = require("../models/addressModel");
const catchAsync = require("../utils/catchAsync");
const { createOne, updateOne, deleteOne } = require("./handlerFactory");

exports.setAddressUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getMyAddresses = catchAsync(async (req, res, next) => {
  const addresses = await Address.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    data: addresses,
  });
});
exports.createAddress = createOne(Address);
exports.updateAddress = updateOne(Address);
exports.deleteAddress = deleteOne(Address);
