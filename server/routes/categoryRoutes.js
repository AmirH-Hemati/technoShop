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
const router = express.Router();
router
  .route("/")
  .get(getCategories)
  .post(uploadCategoryImage, resizeCategoryImage, createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(uploadCategoryImage, resizeCategoryImage, updateCategory)
  .delete(deleteCategory);
module.exports = router;
