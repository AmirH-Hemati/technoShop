const express = require("express");
const {
  uploadFroalaImage,
  resizeFroalaImage,
  deleteFroalaImage,
} = require("../controllers/uploadFroalaControllers");
const router = express.Router();

router.post("/", uploadFroalaImage, resizeFroalaImage);
router.delete("/", deleteFroalaImage);

module.exports = router;
