const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// ENROLL IN A COURSE
const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Check course ID
        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is required"
            });
        }

        // Find course
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check if course is active
        if (course.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Cannot enroll in an inactive course"
            });
        }

        // Check if student already has an active enrollment
        const existingEnrollment = await Enrollment.findOne({
            student: req.user.userId,
            course: courseId,
            status: "ENROLLED"
        });

        if (existingEnrollment) {
            return res.status(409).json({
                message: "You are already enrolled in this course"
            });
        }

        // Count current active enrollments
        const enrolledCount = await Enrollment.countDocuments({
            course: courseId,
            status: "ENROLLED"
        });

        // Check capacity
        if (enrolledCount >= course.capacity) {
            return res.status(400).json({
                message: "Course is full"
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: req.user.userId,
            course: courseId,
            status: "ENROLLED"
        });

        res.status(201).json({
            message: "Course enrollment successful",
            enrollment
        });

    } catch (error) {
        res.status(500).json({
            message: "Enrollment failed",
            error: error.message
        });
    }
};


// GET MY ENROLLMENTS
const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user.userId
        }).populate(
            "course",
            "name description instructor capacity status"
        );

        res.status(200).json({
            count: enrollments.length,
            enrollments
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch enrollments",
            error: error.message
        });
    }
};


// DROP MY ENROLLMENT
const dropEnrollment = async (req, res) => {
    try {
        const { id } = req.params;

        const enrollment = await Enrollment.findOne({
            _id: id,
            student: req.user.userId,
            status: "ENROLLED"
        });

        if (!enrollment) {
            return res.status(404).json({
                message: "Active enrollment not found"
            });
        }

        enrollment.status = "DROPPED";

        await enrollment.save();

        res.status(200).json({
            message: "Course dropped successfully",
            enrollment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to drop enrollment",
            error: error.message
        });
    }
};


// ADMIN - GET ALL ENROLLMENTS
const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate("student", "name email role")
            .populate(
                "course",
                "name instructor capacity status"
            );

        res.status(200).json({
            count: enrollments.length,
            enrollments
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch all enrollments",
            error: error.message
        });
    }
};


// ADMIN - UPDATE ENROLLMENT STATUS
const updateEnrollmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "ENROLLED",
            "DROPPED",
            "CANCELLED"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid enrollment status"
            });
        }

        const enrollment = await Enrollment.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }

        res.status(200).json({
            message: "Enrollment status updated successfully",
            enrollment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update enrollment status",
            error: error.message
        });
    }
};


module.exports = {
    enrollInCourse,
    getMyEnrollments,
    dropEnrollment,
    getAllEnrollments,
    updateEnrollmentStatus
};