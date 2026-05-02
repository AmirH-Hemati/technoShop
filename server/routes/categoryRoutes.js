const express = require("express");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeCategoryImage,
} = require("../controllers/categoryControllers");
const createCategorySchema = require("../schema/category.schema");
const { z } = require("zod");
const validateZod = require("../middlewares/validateZod");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeCategoryImage,
    validateZod(createCategorySchema),
    createCategory,
  );

router
  .route("/:id")
  .get(getCategory)
  .patch(uploadCategoryImage, resizeCategoryImage, updateCategory)
  .delete(deleteCategory);
module.exports = router;
