const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

// Get My Profile
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user._id }).populate("user classInfo");

        if (!student) {
            return res.status(404).json({ success: false, message: "Student profile not found" });
        }

        res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get Attendance History
exports.getAttendanceHistory = async (req, res) => {
    try {
        // First find student ID from user ID
        const student = await Student.findOne({ user: req.user._id });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student profile not found" });
        }

        const attendance = await Attendance.find({ student: student._id }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            attendance
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
