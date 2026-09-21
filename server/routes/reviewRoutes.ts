import express from "express";
import { protect } from "../controllers/authControllers";
import {
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setProductUserId,
  getReviews,
} from "../controllers/reviewControllers";
import validateZod from "../middlewares/validateZod";
import createReviewSchema from "../schema/review.schema";

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route("/")
  .get(getReviews)
  .post(setProductUserId, validateZod(createReviewSchema), createReview);

router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);

export default router;