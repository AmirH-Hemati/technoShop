const Comment = require("../models/CommentModel");

const {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");

exports.setProductUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};
exports.getComments = getAll(Comment);
exports.getComment = getOne(Comment);
exports.createComment = createOne(Comment);
exports.updateComment = updateOne(Comment);
exports.deleteComment = deleteOne(Comment);
