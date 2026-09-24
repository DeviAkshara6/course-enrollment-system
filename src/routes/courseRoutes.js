const express = require("express");

const {
    getCourses,
    createCourse,
    updateCourse,
    deactivateCourse
} = require("../controllers/courseController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

// USER + ADMIN
// View active courses
router.get(
    "/",
    authenticateUser,
    getCourses
);

// ADMIN ONLY
// Create course
router.post(
    "/",
    authenticateUser,
    authorizeAdmin,
    createCourse
);

// ADMIN ONLY
// Update course
router.put(
    "/:id",
    authenticateUser,
    authorizeAdmin,
    updateCourse
);

// ADMIN ONLY
// Deactivate course
router.patch(
    "/:id/deactivate",
    authenticateUser,
    authorizeAdmin,
    deactivateCourse
);

module.exports = router;