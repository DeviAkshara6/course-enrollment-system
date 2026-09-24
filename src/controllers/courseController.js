const Course = require("../models/Course");

// GET ALL ACTIVE COURSES
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            status: "ACTIVE"
        });

        res.status(200).json({
            count: courses.length,
            courses
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch courses",
            error: error.message
        });
    }
};


// CREATE COURSE - ADMIN ONLY
const createCourse = async (req, res) => {
    try {
        const {
            name,
            description,
            instructor,
            capacity
        } = req.body;

        // Check required fields
        if (!name || !description || !instructor || !capacity) {
            return res.status(400).json({
                message: "Name, description, instructor and capacity are required"
            });
        }

        // Create course
        const existingCourse = await Course.findOne({
    name: name.trim()
});

if (existingCourse) {
    return res.status(409).json({
        message: "A course with this name already exists"
    });
}

const course = await Course.create({
    name: name.trim(),
    description,
    instructor,
    capacity,
    status: "ACTIVE"
});

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create course",
            error: error.message
        });
    }
};


// UPDATE COURSE - ADMIN ONLY
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update course",
            error: error.message
        });
    }
};


// DEACTIVATE COURSE - ADMIN ONLY
const deactivateCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            {
                status: "INACTIVE"
            },
            {
                new: true
            }
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course deactivated successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to deactivate course",
            error: error.message
        });
    }
};


module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deactivateCourse
};