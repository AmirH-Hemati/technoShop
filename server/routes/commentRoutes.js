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
const router = express.Router({ mergeParams: true });

router.use(protected);

router.route("/").get(getComments).post(setProductUserId, createComment);

router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);
module.exports = router;
