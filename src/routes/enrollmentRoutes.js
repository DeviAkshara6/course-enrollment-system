const express = require("express");

const {
    enrollInCourse,
    getMyEnrollments,
    dropEnrollment,
    getAllEnrollments,
    updateEnrollmentStatus
} = require("../controllers/enrollmentController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

// ===============================
// USER ROUTES
// ===============================

// Enroll in a course
router.post(
    "/",
    authenticateUser,
    enrollInCourse
);

// View my enrollments
router.get(
    "/my",
    authenticateUser,
    getMyEnrollments
);

// Drop my enrollment
router.patch(
    "/:id/drop",
    authenticateUser,
    dropEnrollment
);


// ===============================
// ADMIN ROUTES
// ===============================

// View all enrollments
router.get(
    "/all",
    authenticateUser,
    authorizeAdmin,
    getAllEnrollments
);

// Update enrollment status
router.patch(
    "/:id/status",
    authenticateUser,
    authorizeAdmin,
    updateEnrollmentStatus
);

module.exports = router;