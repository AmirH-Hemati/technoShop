const express = require("express");

const {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  setProductUserId,
} = require("../controllers/commentControllers");
const { protected } = require("../controllers/authControllers");
const validateZod = require("../middlewares/validateZod");
const createCommentSchema = require("../schema/comment.schema");
const router = express.Router({ mergeParams: true });

router.use(protected);

router
  .route("/")
  .get(getComments)
  .post(setProductUserId, validateZod(createCommentSchema), createComment);

router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);
module.exports = router;
