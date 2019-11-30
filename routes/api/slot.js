const express = require("express");
const router = express.Router();
const slotsController = require("../../controllers/slotsController");

router.get("/:id", slotsController.findSlot);
router.post("/", slotsController.createSlot);
router.put("/:id", slotsController.updateSlot);
router.delete("/:id", slotsController.updateSlot);

module.exports = router;
