const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

// Mark Attendance
exports.markAttendance = async (req, res) => {
    try {
        const { studentId, date, status, classId } = req.body;

        const attendance = await Attendance.create({
            student: studentId,
            date: date || Date.now(),
            status,
            classInfo: classId
        });

        res.status(201).json({
            success: true,
            attendance
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Students for a class
exports.getStudentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const students = await Student.find({ classInfo: classId }).populate("user", "name email");

        res.status(200).json({
            success: true,
            students
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
