import express from "express";
import {
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
} from "../controllers/productControllers";
import commentRoutes from "./commentRoutes";
import reviewRoutes from "./reviewRoutes";
import validateZod from "../middlewares/validateZod";
import productSchema from "../schema/product.schema";

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
    validateZod(productSchema),
    createProduct
  );

router.get("/:slug", getProductWithSlug);

router
  .route("/:id")
  .get(getProduct)
  .patch(
    uploadProductImage,
    resizeProductImage,
    convertStringToParse,
    validateZod(productSchema),
    updateProduct
  )
  .delete(deleteProduct);

export default router;