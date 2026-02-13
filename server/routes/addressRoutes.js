const express = require("express");
const {
  createAddress,
  setAddressUserId,
  deleteAddress,
  updateAddress,
  getMyAddresses,
} = require("../controllers/addressControllers");
const { protected } = require("../controllers/authControllers");

const router = express.Router();

router.use(protected);

router.get("/myAddress", getMyAddresses);
router.post("/", setAddressUserId, createAddress);

router.route("/:id").patch(updateAddress).delete(deleteAddress);

module.exports = router;
