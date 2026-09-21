import express from "express";
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeCategoryImage,
} from "../controllers/categoryControllers";
import createCategorySchema from "../schema/category.schema";
import { z } from "zod";
import validateZod from "../middlewares/validateZod";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeCategoryImage,
    validateZod(createCategorySchema),
    createCategory
  );

router
  .route("/:id")
  .get(getCategory)
  .patch(uploadCategoryImage, resizeCategoryImage, updateCategory)
  .delete(deleteCategory);

export default router;