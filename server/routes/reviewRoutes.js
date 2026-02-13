const express = require("express");

const { protected } = require("../controllers/authControllers");
const {
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setProductUserId,
  getReviews,
} = require("../controllers/reviewControllers");
const router = express.Router({ mergeParams: true });

router.use(protected);

router.route("/").get(getReviews).post(setProductUserId, createReview);

router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);
module.exports = router;
