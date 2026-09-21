const express = require("express");
const {
  createAddress,
  setAddressUserId,
  deleteAddress,
  updateAddress,
  getMyAddresses,
} = require("../controllers/addressControllers");
const { protected } = require("../controllers/authControllers");
const validateZod = require("../middlewares/validateZod");
const addressSchema = require("../schema/address.schema");

const router = express.Router();

router.use(protected);

router.get("/myAddress", getMyAddresses);
router.post("/", setAddressUserId,  createAddress);
// validateZod(addressSchema),
router.route("/:id").patch(updateAddress).delete(deleteAddress);

module.exports = router;
