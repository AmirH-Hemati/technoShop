const express = require("express");
const { protected } = require("../controllers/authControllers");
const {
  deleteFavoriet,
  getFavoriet,
  myFavoriets,
  setFavorietUserId,
  toggleFavoriet,
} = require("../controllers/favorietControllers");
const validateZod = require("../middlewares/validateZod");
const createFavoriteSchema = require("../schema/favorite.schema");

const router = express.Router();

router.use(protected);
router.get("/myFavoriets", myFavoriets);
router.post(
  "/",
  setFavorietUserId,
  validateZod(createFavoriteSchema),
  toggleFavoriet,
);
router.route("/:id").get(getFavoriet).delete(deleteFavoriet);

module.exports = router;
