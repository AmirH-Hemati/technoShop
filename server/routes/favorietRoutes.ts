import express from "express";
import { protect } from "../controllers/authControllers";
import {
  deleteFavoriet,
  getFavoriet,
  myFavoriets,
  setFavorietUserId,
  toggleFavoriet,
} from "../controllers/favorietControllers";
import validateZod from "../middlewares/validateZod";
import createFavoriteSchema from "../schema/favorite.schema";

const router = express.Router();

router.use(protect);
router.get("/myFavoriets", myFavoriets);
router.post(
  "/",
  setFavorietUserId,
  validateZod(createFavoriteSchema),
  toggleFavoriet
);
router.route("/:id").get(getFavoriet).delete(deleteFavoriet);

export default router;