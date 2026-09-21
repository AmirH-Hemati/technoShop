import express from "express";
import {
  handelSendCode,
  handelSmsAuth,
  protect,
  logout,
  handleRefresh,
} from "../controllers/authControllers";
import {
  getMe,
  getUser,
  uploadUserImage,
  resizeUserImage,
  updateMe,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userControllers";

const router = express.Router();

router.post("/sendCode", handelSendCode);
router.post("/smsAuth", handelSmsAuth);
router.get("/refresh", handleRefresh);
router.get("/logout", logout);

router.use(protect);
router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserImage, resizeUserImage, updateMe);

// router.use(restrict); protect route for only admin

router.get("/", getUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;