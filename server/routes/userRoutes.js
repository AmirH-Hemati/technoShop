const express = require("express");

const {
  handelSendCode,
  handelSmsAuth,
  protected,
  logout,
  handleRefresh,
} = require("../controllers/authControllers");

const {
  getMe,
  getUser,
  uploadUserImage,
  resizeUserImage,
  updateMe,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/sendCode", handelSendCode);
router.post("/smsAuth", handelSmsAuth);
router.get("/refresh", handleRefresh);
router.get("/logout",  logout);

router.use(protected);
router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserImage, resizeUserImage, updateMe);

// router.use(restrict); protected route for only admin

router.get("/", getUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
