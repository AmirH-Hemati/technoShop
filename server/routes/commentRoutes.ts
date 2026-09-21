import express from "express";
import {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  setProductUserId,
} from "../controllers/commentControllers";
import { protect } from "../controllers/authControllers";
import validateZod from "../middlewares/validateZod";
import createCommentSchema from "../schema/comment.schema";

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route("/")
  .get(getComments)
  .post(setProductUserId, validateZod(createCommentSchema), createComment);

router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);

export default router;