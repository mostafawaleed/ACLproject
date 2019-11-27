const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/coursesControllers");

router.get("/:id", courseController.viewCourse);
router.post("/", courseController.createCourse);
router.put("/:id", auth.canUpdateApplication, courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
