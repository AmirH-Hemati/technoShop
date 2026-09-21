import express from "express";
import {
  uploadFroalaImage,
  resizeFroalaImage,
  deleteFroalaImage,
} from "../controllers/uploadFroalaControllers";

const router = express.Router();

router.post("/", uploadFroalaImage, resizeFroalaImage);
router.delete("/", deleteFroalaImage);

export default router;