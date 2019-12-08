const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userControllers");

router.post("/username", userController.getUserbyusername);
router.get("/:id", userController.getUser);

router.post("/enroll", userController.enrollUser);

router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
