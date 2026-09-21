import express from "express";
import {
  createAddress,
  setAddressUserId,
  deleteAddress,
  updateAddress,
  getMyAddresses,
} from "../controllers/addressControllers";
import { protect } from "../controllers/authControllers";
import validateZod from "../middlewares/validateZod";
import addressSchema from "../schema/address.schema";

const router = express.Router();

router.use(protect);

router.get("/myAddress", getMyAddresses);
router.post("/", setAddressUserId, validateZod(addressSchema), createAddress);
router.route("/:id").patch(updateAddress).delete(deleteAddress);

export default router;