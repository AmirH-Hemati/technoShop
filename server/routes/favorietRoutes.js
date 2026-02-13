const express = require("express");
const { protected } = require("../controllers/authControllers");
const {
  deleteFavoriet,
  getFavoriet,
  myFavoriets,
  setFavorietUserId,
  toggleFavoriet,
} = require("../controllers/favorietControllers");

const router = express.Router();

router.use(protected);
router.get("/myFavoriets", myFavoriets);
router.post("/", setFavorietUserId, toggleFavoriet);
router.route("/:id").get(getFavoriet).delete(deleteFavoriet);

module.exports = router;
