const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resizeProductImage,
  findCategoryIdByValue,
  getProductByIds,
  getProductWithSlug,
  convertStringToParse,
} = require("../controllers/productControllers");
const commentRoutes = require("./commentRoutes");
const reviewRoutes = require("./reviewRoutes");
const router = express.Router();

router.use("/:productId/comments", commentRoutes);
router.use("/:productId/reviews", reviewRoutes);

router.post("/by-ids", getProductByIds);

router
  .route("/")
  .get(findCategoryIdByValue, getProducts)
  .post(
    uploadProductImage,
    resizeProductImage,
    convertStringToParse,
    createProduct,
  );

router.get("/:slug", getProductWithSlug);

router
  .route("/:id")
  .get(getProduct)
  .patch(
    uploadProductImage,
    resizeProductImage,
    convertStringToParse,
    updateProduct,
  )
  .delete(deleteProduct);

module.exports = router;
